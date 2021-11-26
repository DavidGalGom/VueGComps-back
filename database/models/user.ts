import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  components: {
    type: [Types.ObjectId],
    ref: "Component",
    required: true,
  },
  image: {
    type: String,
    default:
      "https://img2.freepng.es/20180405/yrw/kisspng-computer-icons-icon-design-person-download-person-5ac698e3047425.9336063215229647070183.jpg",
  },
});

const User = model("User", userSchema, "Users");

export default User;
