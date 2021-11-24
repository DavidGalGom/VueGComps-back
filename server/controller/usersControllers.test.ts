import User from "../../database/models/user";
import getUsers from "./usersControllers";

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
});
