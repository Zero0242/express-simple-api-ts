import { Router } from "express";
import { checkSchema, param } from "express-validator";
import {
  deletePost,
  getAllPost,
  getOnePost,
  makePost,
  postAddPhotos,
  updatePost,
} from "../controllers";
import { authGuard, fieldValidator } from "../middleware";
import { createPostSchema, updatePostSchema } from "../schema";

const router = Router();

router.get("/", getAllPost);
router.get("/:id", getOnePost);
router.post(
  "/",
  [authGuard, checkSchema(createPostSchema) as any, fieldValidator],
  makePost
);
router.post("/upload/:id", [authGuard], postAddPhotos);
router.put(
  "/:id",
  [
    authGuard,
    param("id").notEmpty(),
    checkSchema(updatePostSchema) as any,
    fieldValidator,
  ],
  updatePost
);
router.delete(
  "/:id",
  [authGuard, param("id").notEmpty(), fieldValidator],
  deletePost
);

export default router;
