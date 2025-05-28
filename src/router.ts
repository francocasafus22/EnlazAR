import { log } from "console";
import { Router } from "express";

const router = Router();

// Autenticacion y registro

router.post("/auth/register", (req, res) => {
  const login = req.body;
  console.log(login);
  res.send(`Hola ${login.user}`);
});

export default router;
