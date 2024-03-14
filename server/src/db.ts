import { Client } from "pg";
export const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/bun_business_reviews_db"
);
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Business, Member } from "./BackendTypes";
const secret = process.env.JWT || "shhh";
if (secret === "shhh") {
  console.log("If deployed, set process.env.JWT to something other than shhh");
}

// Creation of data tables for members and businesses
export const createTables = async () => {
  const SQL = /*sql*/ `
    DROP TABLE IF EXISTS members;
    DROP TABLE IF EXISTS businesses;
    CREATE TABLE members(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE businesses(
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        city VARCHAR(255) NOT NULL,
        photo_url VARCHAR(255)
    );
    `;
  await client.query(SQL);
};

// Creating methods to insert new data for members and businesses
export const createMember = async ({ id, username, password }: Member) => {
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
}: Business) => {
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

// Fetching data methods for members and businesses
export const fetchMembers = async () => {
  const SQL = /*sql*/ `
    SELECT id, username FROM members;
    `;
  const response = await client.query(SQL);
  return response.rows;
};
export const fetchBusinesses = async () => {
  const SQL = /*sql*/ `
    SELECT * FROM businesses;
    `;
  const response = await client.query(SQL);
  return response.rows;
};
