import { Schema, model } from "mongoose";

const componentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mainImage: {
    type: String,
    default:
      "https://tecnobirdman.com/wp-content/uploads/2020/10/Como-ver-los-componentes-de-mi-PC-Windows-10-1280x720.jpg",
  },
  alterImage: {
    type: String,
    default:
      "https://tecnobirdman.com/wp-content/uploads/2020/10/Como-ver-los-componentes-de-mi-PC-Windows-10-1280x720.jpg",
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const Component = model("Component", componentSchema, "Components");

export default Component;
