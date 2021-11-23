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
    required: true,
  },
});

const User = model("User", userSchema, "Users");

export default User;
