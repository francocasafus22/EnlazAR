import express from "express";
import router from "./router";

const app = express();

// Leer datos de formularios - Middleware express.json()
app.use(express.json());

app.use("/", router);

export default app;
