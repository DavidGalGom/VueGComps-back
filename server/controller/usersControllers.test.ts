import bcrypt from "bcrypt";
import User from "../../database/models/user";
import { getUsers, addUser } from "./usersControllers";

jest.mock("../../database/models/user");
jest.mock("bcrypt");

describe("Given a getUsers function", () => {
  describe("When it receives an object res", () => {
    test("Then it should summon the method json", async () => {
      const users = [
        {
          name: "David",
          userName: "Davidgg",
          password: "******",
          email: "davidgg@davidgg.com",
          age: 29,
          isAdmin: true,
          components: [],
          image: "image.png",
        },
        {
          name: "David",
          userName: "David",
          password: "******",
          email: "david@david.com",
          age: 29,
          isAdmin: false,
          components: [],
          image: "image.png",
        },
      ];
      User.find = jest.fn().mockResolvedValue(users);
      const res = {
        json: jest.fn(),
      };

      await getUsers(null, res, null);

      expect(User.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("When its called wrong", () => {
    test("Then it should return a error with code 400", async () => {
      const req = {
        body: {
          name: "David",
          userName: "David",
          password: "******",
          email: "david@david.com",
          age: 29,
          isAdmin: false,
          components: [],
          image: "image.png",
        },
      };
      User.find = jest.fn().mockResolvedValue(null);
      const next = jest.fn();
      const expectedError: { code: number; message: string } = {
        code: 400,
        message: "Can't find the users",
      };

      await getUsers(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
    });
  });
});

describe("Given a addUser function", () => {
  describe("When it receives anew user", () => {
    test("Then it should summon res.json with a new user", async () => {
      const req = {
        body: {
          name: "David",
          userName: "David",
          password: "******",
          email: "david@david.com",
          age: 29,
          isAdmin: false,
          components: [],
          image: "image.png",
        },
      };
      const user = {
        name: "David",
        userName: "David",
        password: "******",
        email: "david@david.com",
        age: 29,
        isAdmin: false,
        components: [],
        image: "image.png",
      };

      const res = {
        json: jest.fn(),
      };

      bcrypt.hash = jest.fn().mockResolvedValue(user.password);
      User.create = jest.fn().mockResolvedValue(user);

      await addUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
});
