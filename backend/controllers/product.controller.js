import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const postProducts = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const putProducts = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const productId = id;
    const productData = body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Product Id" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
