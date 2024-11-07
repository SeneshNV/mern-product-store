import express from "express";
import { log } from "node:console";
import dotenv from "dotenv";
import path from "node:path";
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/products.route.js";

dotenv.config();
// console.log("env:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());

app.use("/api/products", productsRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Server is ready..");
});

app.listen(PORT, () => {
  connectDB();
  log(`Server started http://localhost:${PORT} ...`);
});
