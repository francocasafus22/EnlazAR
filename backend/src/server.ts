import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

connectDB();

const app = express();

// Endpoint para evitar el cold start
app.get("/ping", cors(), (_req, res) => {
  res.status(200).json({ ping: "pong 🏓" });
});

// Cors

app.use(cors(corsConfig));

// Leer datos de formularios - Middleware express.json()
app.use(express.json());

app.use("/", router);

export default app;
