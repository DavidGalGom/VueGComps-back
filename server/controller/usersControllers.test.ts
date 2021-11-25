import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";
import {
  getUsers,
  addUser,
  loginUser,
  updateUser,
  getUserById,
} from "./usersControllers";
import IResponseTest from "../../interfaces/response";

jest.mock("../../database/models/user");
jest.mock("bcrypt");
const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

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

  describe("When it receives a new userwith wrong params", () => {
    test("Then it should summon next function with an error", async () => {
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
      const next = jest.fn();
      const expectedError: { code: number; message: string } = {
        code: 400,
        message: "Wrong data",
      };

      bcrypt.hash = jest.fn().mockResolvedValue(user.password);
      User.create = jest.fn().mockRejectedValue(expectedError);

      await addUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});

describe("Given a loginUser function", () => {
  describe("When it receives a wrong username", () => {
    test("Then it should summon next function with an error", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          userName: "David",
          password: "*****",
        },
      };
      const next = jest.fn();
      const expectedError: { code: number; message: string } = {
        code: 401,
        message: "Wrong credentials",
      };

      await loginUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When it receives an existing username and a correct password", () => {
    test("Then it should summon res.json with a token", async () => {
      const req = {
        body: {
          userName: "David",
          password: "*****",
        },
      };
      const user = {
        userName: "David",
        password: "*****",
      };
      const expectedToken = {
        token: "Token",
      };
      const res = {
        json: jest.fn(),
      };
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("Token");

      await loginUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedToken);
    });
  });
  describe("When it receives a wrong password", () => {
    test("Then it should summon next function with an error", async () => {
      const req = {
        body: {
          userName: "David",
          password: "*****",
        },
      };
      const user = {
        userName: "David",
        password: "*****",
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const expectedError: { code: number; message: string } = {
        code: 401,
        message: "Wrong credentials",
      };

      await loginUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});

describe("Given an updateUser function", () => {
  describe("When arrives a wrong body of updateUser", () => {
    test("Then it should return an error with a 400 code and a message", async () => {
      const idUser = "Random id";
      const req = {
        params: {
          idUser,
        },
      };
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 400,
        message: "Wrong format",
      };
      User.findByIdAndUpdate = jest.fn().mockRejectedValue(null);

      await updateUser(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a wrong id", () => {
    test("Then it should call next with a 404 code and user not found message", async () => {
      const idUser = "Whatever";
      const req = {
        params: {
          idUser,
        },
      };
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 404,
        message: "User not found",
      };
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updateUser(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives an id, and a body with correct params", () => {
    test("Then it should update the user with the new params", async () => {
      const idUser = "id";
      const req = {
        params: {
          idUser,
        },
      };
      const res = mockResponse();
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(idUser);

      await updateUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(idUser);
    });
  });
});

describe("Given a getUserById function", () => {
  describe("When it receives a request with id 1 and a res object", () => {
    test("Then it should summon res.json", async () => {
      User.findById = jest.fn().mockResolvedValue({});
      const idUser = 1;
      const req = {
        params: {
          idUser,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getUserById(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
