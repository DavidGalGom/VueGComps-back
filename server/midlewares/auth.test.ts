import jwt from "jsonwebtoken";
import auth from "./auth";
import IResponseTest from "../../interfaces/response";
import RequestAuth from "../../interfaces/requestAuth";

const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

const mockRequestAuth = (body?: any, header?: any, params?: any) => {
  const req = {} as RequestAuth;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.userId = "";
  req.params = params;

  return req;
};

jest.mock("jsonwebtoken");

describe("Given an Auth middleware", () => {
  describe("When it gets a request without authorization", () => {
    test("Then it should send an error with a message 'Authorization missing'", () => {
      const req = mockRequestAuth(null, null);
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 401,
        message: "Authorization missing",
      };

      auth(req, null, next);

      expect(next).toHaveBeenLastCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it gets a request with a valid Header but  not a token", () => {
    test("Then it should send an error with a message 'Token missing'", () => {
      const req = mockRequestAuth(null, "Bearer ");
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 401,
        message: "Token missing",
      };

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });

  describe("When it gets a request with a Authorization header but with an incorrect token", () => {
    test("Then it should send an error with a message 'Wrong token' and status 401", async () => {
      const req = mockRequestAuth(null, "Bearer token");
      const res = mockResponse();
      const next = jest.fn();
      jwt.verify = jest.fn().mockReturnValue(null);

      const error: { code: number; message: string } = {
        code: 401,
        message: "Wrong token",
      };

      await auth(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});
