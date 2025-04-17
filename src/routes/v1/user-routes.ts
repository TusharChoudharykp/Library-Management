import express from "express";
import { signup, login } from "../../controllers/user-controller";
import {
  validateSignup,
  validateLogin,
} from "../../middlewares/user-middleware";

const router = express.Router();

router.post("/signup", validateSignup, signup);

router.post("/login", validateLogin, login);

export default router;
