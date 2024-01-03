import { Router } from "express";
import {
  deletePost,
  getAllPost,
  getOnePost,
  makePost,
  updatePost,
} from "../controllers";

const router = Router();

router.get("/", getAllPost);
router.get("/:id", getOnePost);
router.post("/", makePost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
