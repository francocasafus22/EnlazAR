import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./controllers/userController";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

router.get("/", (req, res) => {
  res.send("Mi primer server con TypeScript y Express :)");
});

// Autenticacion y registro

router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio."),
  body("name").notEmpty().withMessage("El nombre no puede ir vacio."),
  body("email").isEmail().withMessage("E-Mail no valido."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña tiene que tener mas de 8 caracteres."),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("E-Mail no valido."),
  body("password").notEmpty().withMessage("La contraseña es obligatorio."),
  handleInputErrors,
  login
);

export default router;
