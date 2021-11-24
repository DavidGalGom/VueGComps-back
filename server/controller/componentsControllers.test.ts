import Component from "../../database/models/component";
import { getComponents, getComponentById } from "./componentsControllers";

jest.mock("../../database/models/component");

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
});
