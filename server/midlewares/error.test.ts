import { notFoundErrorHandler, generalErrorHandler } from "./error";
import IResponseTest from "../../interfaces/response";

const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given a notFoundError handler function", () => {
  describe("When it receives a request", () => {
    test("Then it should return a code error 404 not found", () => {
      const res = mockResponse();

      notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });
});

describe("Given a general error handler", () => {
  describe("When it receives an error without information", () => {
    test("Then it should return a code 500 and a fatal error message", () => {
      const res = mockResponse();
      const error = {
        code: 500,
        message: "Fatal error",
      };

      generalErrorHandler(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Fatal error" });
    });
  });
});
