import { Client } from "pg";
export const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/bun_business_reviews_db"
);
import type {
  Business,
  Member,
  Review,
  SpecializedError,
} from "./backendTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = process.env.JWT || "shhh";
if (secret === "shhh") {
  console.log("If deployed, set process.env.JWT to something other than shhh");
}

// Creation of data tables for members, businesses and reviews
export const createTables = async () => {
  const SQL = /*sql*/ `
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS members;
    DROP TABLE IF EXISTS businesses;

    CREATE TABLE members(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE businesses(
        id UUID PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        city VARCHAR(255) NOT NULL,
        photo_url VARCHAR(255)
    );

    CREATE TABLE reviews(
        id UUID PRIMARY KEY,
        member_id UUID REFERENCES members(id) NOT NULL,
        business_id UUID REFERENCES businesses(id) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        CONSTRAINT unique_review UNIQUE(member_id, business_id)
    );
    `;
  await client.query(SQL);
};

// Creating methods to insert new data for members, businesses and reviews
export const createMember = async ({
  id,
  username,
  password,
}: Member): Promise<Member> => {
  const SQL = /*sql*/ `
    INSERT INTO members(id, username, password)
    VALUES($1, $2, $3)
    RETURNING *
    `;
  const response = await client.query(SQL, [
    id,
    username,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0] as Member;
};
export const createBusiness = async ({
  id,
  name,
  description,
  city,
  photo_url,
}: Business): Promise<Business> => {
  const SQL = /*sql*/ `
    INSERT INTO businesses(id, name, description, city, photo_url)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const response = await client.query(SQL, [
    id,
    name,
    description,
    city,
    photo_url || "",
  ]);
  return response.rows[0] as Business;
};
export const createReview = async ({
  id,
  member_id,
  business_id,
  rating,
  comment,
}: Review): Promise<Review> => {
  const SQL = /*sql*/ `
    INSERT INTO reviews(id, member_id, business_id, rating, comment)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const response = await client.query(SQL, [
    id,
    member_id,
    business_id,
    rating,
    comment || "",
  ]);
  return response.rows[0] as Review;
};

// Fetching data methods for members, businesses and reviews
export const fetchMembers = async (): Promise<Member[]> => {
  const SQL = /*sql*/ `
    SELECT id, username FROM members;
    `;
  const response = await client.query(SQL);
  return response.rows as Member[];
};
export const fetchBusinesses = async (): Promise<Business[]> => {
  const SQL = /*sql*/ `
    SELECT * FROM businesses;
    `;
  const response = await client.query(SQL);
  return response.rows as Business[];
};
export const fetchReviews = async (): Promise<Review[]> => {
  const SQL = /*sql*/ `
    SELECT * FROM reviews;
    `;
  const response = await client.query(SQL);
  return response.rows as Review[];
};
export const fetchReviewsById = async (
  id: string,
  type: "member" | "business"
): Promise<Review[]> => {
  if (!type) {
    const error: SpecializedError = Error("Valid type required");
    error.status = 400;
    throw error;
  }
  const SQL = /*sql*/ `
    SELECT * FROM reviews WHERE ${type}_id = $1;
    `;
  const response = await client.query(SQL, [id]);
  return response.rows as Review[];
};

// Authentication and verify methods
export const authenticate = async ({
  username,
  password,
}: Member): Promise<{ token: string }> => {
  const SQL = /*sql*/ `
    SELECT id, username, password FROM members WHERE username=$1;
    `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error: SpecializedError = Error("Not authorized");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ id: response.rows[0].id }, secret);
  return { token };
};
export const findMemberWithToken = async (token: string): Promise<Member> => {
  try {
    var payload = jwt.verify(token, secret) as { id: string };
  } catch (ex) {
    const error: SpecializedError = Error("Not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = /*sql*/ `
      SELECT id, username FROM members WHERE id=$1;
      `;
  const response = await client.query(SQL, [payload.id]);
  if (!response.rows.length) {
    const error: SpecializedError = Error("Not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0] as Member;
};

// Updating data methods for members, businesses and reviews
export const updateMember = async ({
  id,
  username,
}: Member): Promise<Member> => {
  const SQL = /*sql*/ `
    UPDATE members 
    SET username = $1
    WHERE id = $2
    RETURNING id, username
    `;
  const response = await client.query(SQL, [username, id]);
  return response.rows[0] as Member;
};
export const updateBusiness = async ({
  id,
  name,
  description,
  city,
  photo_url,
}: Business): Promise<Business> => {
  const SQL = /*sql*/ `
    UPDATE businesses 
    SET name = $1, description = $2, city = $3, photo_url = $4
    WHERE id = $5
    RETURNING *
    `;
  const response = await client.query(SQL, [
    name,
    description,
    city,
    photo_url,
    id,
  ]);
  return response.rows[0] as Business;
};
export const updateReview = async ({
  id,
  rating,
  comment,
}: Review): Promise<Review> => {
  const SQL = /*sql*/ `
    UPDATE reviews 
    SET rating = $3, comment = $4
    WHERE id = $5
    RETURNING *
    `;
  const response = await client.query(SQL, [rating, comment, id]);
  return response.rows[0] as Review;
};

// Deleting data methods for members, businesses and reviews
export const deleteMember = async ({ id }: Member): Promise<void> => {
  const SQL = /*sql*/ `
    DELETE FROM members WHERE id = $1
    `;
  await client.query(SQL, [id]);
};
export const deleteBusiness = async ({ id }: Business): Promise<void> => {
  const SQL = /*sql*/ `
    DELETE FROM businesses WHERE id = $1
    `;
  await client.query(SQL, [id]);
};
export const deleteReview = async ({ id }: Review): Promise<void> => {
  const SQL = /*sql*/ `
    DELETE FROM reviews WHERE id = $1
    `;
  await client.query(SQL, [id]);
};
