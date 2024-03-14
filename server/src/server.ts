import {
  client,
  createBusiness,
  createMember,
  createTables,
  fetchBusinesses,
  fetchMembers,
} from "./db";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const init = async () => {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log("Database connected successfully");

  await createTables();
  console.log("Tables created successfully");

  await Promise.all([
    createMember({
      id: uuidv4(),
      username: "moe",
      password: "moe123",
    }),
    createMember({
      id: uuidv4(),

      username: "lucy",
      password: "lucy123",
    }),
    createMember({
      id: uuidv4(),
      username: "ethyl",
      password: "ethyl123",
    }),
    createMember({
      id: uuidv4(),
      username: "curly",
      password: "curly123",
    }),
  ]);
  const [moe, lucy, ethyl, curly] = await fetchMembers();

  console.log(moe, lucy, ethyl, curly);
  console.log("Members created and fetched successfully");

  await Promise.all([
    createBusiness({
      id: uuidv4(),
      name: "Apple",
      description: "Apple is a technology company",
      city: "San Francisco",
    }),
    createBusiness({
      id: uuidv4(),
      name: "Samsung",
      description: "Samsung is a technology company",
      city: "Seoul",
    }),
    createBusiness({
      id: uuidv4(),
      name: "Google",
      description: "Google is a technology company",
      city: "Mountain View",
    }),
    createBusiness({
      id: uuidv4(),
      name: "Facebook",
      description: "Facebook is a technology company",
      city: "Menlo Park",
    }),
    createBusiness({
      id: uuidv4(),
      name: "Tesla",
      description: "Tesla is a technology company",
      city: "Palo Alto",
    }),
  ]);
  const [Apple, Samsung, Google, Facebook, Tesla] = await fetchBusinesses();

  console.log(Apple, Samsung, Google, Facebook, Tesla);
  console.log("Businesses created and fetched successfully");

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

init();
