import {
  authenticate,
  client,
  createBusiness,
  createMember,
  createReview,
  createTables,
  fetchBusinesses,
  fetchMembers,
  fetchReviews,
  fetchReviewsById,
  findMemberWithToken,
} from "./db";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { data, reviewsData } from "./data";
import type { SpecializedError } from "./backendTypes";

const app = express();
app.use(express.json());

// Middleware to check if user is logged in
const isLoggedIn = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("not authorized");
    }
    req.body.member = await findMemberWithToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

// GET Routes for members, businesses and reviews
app.get("/api/members", async (req, res, next) => {
  try {
    res.send(await fetchMembers());
  } catch (error) {
    next(error);
  }
});
app.get("/api/businesses", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (error) {
    next(error);
  }
});
app.get("/api/reviews", async (req, res, next) => {
  try {
    res.send(await fetchReviews());
  } catch (error) {
    next(error);
  }
});
// GET Route for a logged in member
app.get("/api/auth/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.body.member);
  } catch (error) {
    next(error);
  }
});
// GET Route specific reviews
app.get("/api/reviews/:type/:id", async (req, res, next) => {
  try {
    if (!req.params.type || !req.params.id) {
      const error: SpecializedError = Error("Bad Request");
      error.status = 400;
      throw error;
    }
    if (req.params.type !== "member" && req.params.type !== "business") {
      const error: SpecializedError = Error("Bad Request");
      error.status = 400;
      throw error;
    }
    res.send(await fetchReviewsById(req.params.id, req.params.type));
  } catch (error) {
    next(error);
  }
});

// POST Routes to Login and Register
app.post("/api/auth/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body));
  } catch (error) {
    next(error);
  }
});
app.post("/api/auth/register", async (req, res, next) => {
  try {
    req.body.id = uuidv4();
    await createMember(req.body);
    res.send(await authenticate(req.body));
  } catch (error) {
    next(error);
  }
});

// POST Route to add a new business
app.post("/api/businesses", async (req, res, next) => {
  try {
    req.body.id = uuidv4();
    await createBusiness(req.body);
    res.send(req.body);
  } catch (error) {
    next(error);
  }
});
// POST Route to add a new review
app.post("/api/reviews/:business_id", isLoggedIn, async (req, res, next) => {
  try {
    if (!req.params.business_id) {
      const error: SpecializedError = Error("Bad Request");
      error.status = 400;
      throw error;
    }
    req.body.review.member_id = req.body.member.id;
    req.body.review.business_id = req.params.business_id;
    req.body.review.id = uuidv4();
    await createReview(req.body.review);
    res.send(req.body);
  } catch (error) {
    next(error);
  }
});

// Error Handling
app.use(
  (
    err: SpecializedError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    console.error(err);
    res
      .status(err.status || 500)
      .send({ error: err.message ? err.message : err });
  }
);

const init = async () => {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log("Database connected successfully");

  await createTables();
  console.log("Tables created successfully");

  for (let i = 0; i < data.members.length; i++) {
    await createMember(data.members[i]);
  }

  for (let i = 0; i < data.businesses.length; i++) {
    await createBusiness(data.businesses[i]);
  }

  for (let i = 0; i < reviewsData.length; i++) {
    await createReview(reviewsData[i]);
  }

  const [moe, lucy, ethyl, curly] = await fetchMembers();
  console.log(moe, lucy, ethyl, curly);
  console.log("Members created and fetched successfully");

  const [Apple, Samsung, Google, Facebook, Tesla] = await fetchBusinesses();
  console.log(Apple, Samsung, Google, Facebook, Tesla);
  console.log("Businesses created and fetched successfully");

  console.log(await fetchReviews());
  console.log(await fetchReviewsById(moe.id, "member"));
  console.log("Reviews created and fetched successfully");

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

init();
