import {Router} from "express";
import {register, login, refresh, logout} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {validateSchema} from "../middlewares/validate.middleware.ts";
import {loginSchema, registerSchema} from "../validators/auth.validator.ts";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/refresh", refresh);
router.post("/logout", authMiddleware, logout);

export default router;
