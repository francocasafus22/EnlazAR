import { Router } from "express";
import { body } from "express-validator";
import {
  createAccount,
  getUser,
  getUserByHandle,
  login,
  searchByHandle,
  updateProfile,
  updateProfileImage,
} from "./controllers/userController";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";
import cors from "cors";

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

router.get("/user", authenticate, getUser);

router.patch(
  "/user",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio."),
  handleInputErrors,
  authenticate,
  updateProfile
);

router.post("/user/image", authenticate, updateProfileImage);

router.get("/:handle", getUserByHandle);

router.post(
  "/searchByHandle",
  body("handle").notEmpty().withMessage("Ingrese un handle"),
  searchByHandle
);

export default router;
