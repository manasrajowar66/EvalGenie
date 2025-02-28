import express from "express";
import { indexRouter } from "./routes";
import cors from "cors";
import { connectDB, sequelize } from "./config/database";
// import "./models/associations";
import axios from "axios";
import Tag from "./models/tag";
require("dotenv").config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["*"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], // Allowed headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

// Sync Database
sequelize
  .sync({ alter: true }) // Set to true if you want to reset the database
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => console.error("Sync error:", err));

app.listen(5000, () => console.log(`Server running at port ${PORT}`));
