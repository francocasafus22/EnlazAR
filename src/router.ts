import { Router } from "express";
import User from "./models/User";

const router = Router();

router.get("/", (req, res) => {
  res.send("Mi primer server con TypeScript y Express :)");
});

// Autenticacion y registro

router.post("/auth/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    console.error("❌ Error al registrar:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;
