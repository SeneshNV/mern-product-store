import express from "express";
import {
  deleteProducts,
  getProducts,
  postProducts,
  putProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", postProducts);

router.delete("/:id", deleteProducts);

router.put("/:id", putProducts);

export default router;
