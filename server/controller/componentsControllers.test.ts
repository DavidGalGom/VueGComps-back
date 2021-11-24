import Component from "../../database/models/component";
import {
  getComponents,
  getComponentById,
  addComponent,
  deleteComponent,
  updateComponent,
} from "./componentsControllers";
import IResponseTest from "../../interfaces/response";

jest.mock("../../database/models/component");
const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given a getComponents function", () => {
  describe("When it receives an object res", () => {
    test("Then it should summmon the method json", async () => {
      const components = [
        {
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
        {
          name: "Ryzen 7 5800X",
          type: "Chipset",
          price: 324.99,
          mainImage:
            "https://www.muycomputer.com/wp-content/uploads/2015/02/placabase_2.jpg",
          alterImage:
            "https://static-geektopia.com/storage/t/p/540/54025/816x381/file-270fa1...",
          brand: "Asus Rog",
          description: "An amazing motherboard for gaming",
          isFavorite: false,
        },
      ];
      Component.find = jest.fn().mockResolvedValue(components);
      const res = {
        json: jest.fn(),
      };
      await getComponents(null, res, null);

      expect(Component.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(components);
    });
  });
  describe("When its called wrong", () => {
    test("Then it should summon with and error and code 400 ", async () => {
      const req = {
        body: {
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
      };
      Component.find = jest.fn().mockResolvedValue(null);
      const next = jest.fn();
      const expectedError: any = new Error("Can't find the components");
      expectedError.code = 400;

      await getComponents(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Can't find the components"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
});

describe("Given a getComponentById function", () => {
  describe("When it receives a request with id 1, a res object", () => {
    test("Then it should summon Component.findById with a 1", async () => {
      Component.findById = jest.fn().mockResolvedValue({});
      const idComponent = 1;
      const req = {
        params: {
          idComponent,
        },
      };
      const res = {
        json: () => {},
      };

      await getComponentById(req, res, null);

      expect(Component.findById).toHaveBeenCalledWith(idComponent);
    });
  });

  describe("When receives a Component.findById reject", () => {
    test("Then it should summon next function with the rejected error", async () => {
      const error = {};
      Component.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idComponent: 1,
        },
      };
      const next = jest.fn();

      await getComponentById(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it arrives an id that there isn't in the database", () => {
    test("Then it should return a 404 code and a component not found message", async () => {
      const error: any = new Error("Component not found");
      Component.findById = jest.fn().mockResolvedValue(null);
      const idComponent: number = 20;
      const req = {
        params: {
          idComponent,
        },
      };
      const res = {
        json: () => {},
      };
      const next = jest.fn();

      await getComponentById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Component not found"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });
});

describe("Given a addComponent function", () => {
  describe("When it receives a resolved value", () => {
    test("Then it should create a new component", async () => {
      const req = {
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
      };
      const result = {
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
      };
      const res = mockResponse();

      Component.create = jest.fn().mockResolvedValue(result);
      await addComponent(req, res, null);

      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe("When it receives a rejected promise", () => {
    test("Then it should summon the method next with an error", async () => {
      const req = jest.fn();
      Component.create = jest.fn().mockRejectedValue({});
      const next = jest.fn();
      const res = mockResponse();

      await addComponent(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteComponent function", () => {
  describe("When it receives a non valid id", () => {
    test("Then it should summon next with a code 400 and a bad request! message", async () => {
      const error: any = {};
      Component.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idComponent: 1,
        },
      };
      const next = jest.fn();

      await deleteComponent(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("When it receives an id with no component", () => {
    test("Then it should call next with a 404 code and a component not found message", async () => {
      const error: any = new Error("Component not found");
      Component.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const req = {
        params: {
          id: 1,
        },
      };
      const next = jest.fn();

      await deleteComponent(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Component not found"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When it receives a right id", () => {
    test("Then it should delete the component who correspond with the id", async () => {
      const idComponent: number = 1;
      const req = {
        params: {
          idComponent,
        },
      };
      const res = {
        json: () => {},
      };
      Component.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteComponent(req, res, null);
      expect(Component.findByIdAndDelete).toHaveBeenCalledWith(idComponent);
    });
  });
});

describe("Given a updateComponent function", () => {
  describe("When arrives a wrong body of updateComponent function", () => {
    test("Then it should return an error and a status 400", async () => {
      const idComponent = "Whatever";
      const req = {
        params: {
          idComponent,
        },
      };
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 400,
        message: "Wrong format",
      };
      Component.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateComponent(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a wrong id", () => {
    test("Then it should call next with a 404 code and Component not found message", async () => {
      const idComponent = "Whatever";
      const req = {
        params: {
          idComponent,
        },
      };
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 404,
        message: "Component not found",
      };
      Component.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updateComponent(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives an id, and a body with correct params", () => {
    test("Then it should update the components with the new params", async () => {
      const idComponent = "A correct random id";
      const req = {
        params: {
          idComponent,
        },
      };
      const res = mockResponse();
      Component.findByIdAndUpdate = jest.fn().mockResolvedValue(idComponent);

      await updateComponent(req, res, null);

      expect(res.json).toHaveBeenCalledWith(idComponent);
    });
  });
});
