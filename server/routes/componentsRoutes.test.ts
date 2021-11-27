import dotenv from "dotenv";

import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";
import supertest from "supertest";
import initializeMongoDBServer from "../../database/index";
import Component from "../../database/models/component";
import { initializeServer, app } from "../index";

dotenv.config();

const request = supertest(app);
const debug = Debug("components:componentsRoutes-test");
let server;

beforeAll(async () => {
  await initializeMongoDBServer(process.env.MONGODB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  await Component.deleteMany();
  await Component.create({
    _id: "619ba9ca8335600761d52e14",
    __v: 0,
    name: "AsusRog Motherboard",
    type: "Motherboard",
    price: 199.99,
    mainImage:
      "https://www.muycomputer.com/wp-content/uploads/2015/02/placabase_2.jpg",
    alterImage:
      "https://static-geektopia.com/storage/t/p/540/54025/816x381/file-270fa1...",
    brand: "Asus Rog",
    description: "An amazing motherboard for gaming",
    isFavorite: false,
  });
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Connexion to database ended"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("Connexion to server ended"));
  });
  await server.close();
});

describe("Given a /components endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should send a response with the components", async () => {
      const { body } = await request.get("/components").expect(200);
      expect(body).toEqual([
        {
          id: "619ba9ca8335600761d52e14",
          name: "AsusRog Motherboard",
          type: "Motherboard",
          price: 199.99,
          mainImage:
            "https://www.muycomputer.com/wp-content/uploads/2015/02/placabase_2.jpg",
          alterImage:
            "https://static-geektopia.com/storage/t/p/540/54025/816x381/file-270fa1...",
          brand: "Asus Rog",
          description: "An amazing motherboard for gaming",
          isFavorite: false,
        },
      ]);
    });
  });
});
