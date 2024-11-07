import mongoose from "mongoose";

// function provided by Mongoose to define the structure of documents in a MongoDB collection.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema); //model name and schema name

export default Product;
