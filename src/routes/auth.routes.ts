import { Router } from "express";
import { checkSchema } from "express-validator/src/middlewares/schema";
import {
  loginGet,
  loginPost,
  registrarPost,
  updateAvatar,
} from "../controllers";
import { authGuard, fieldValidator } from "../middleware";
import { registerSchema } from "../schema";

const router = Router();

router.get("/login", [authGuard], loginGet);
router.post("/login", loginPost);
router.post(
  "/register",
  [checkSchema(registerSchema, ["body"]) as any, fieldValidator],
  registrarPost
);

router.post("/avatarset", [authGuard], updateAvatar);

export default router;
