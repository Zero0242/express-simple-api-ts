import { Router } from "express";
import { adminMiddleware } from "../middleware";
import { fillShops, getAllShops } from "../controllers";

const router = Router();

router.get("/", getAllShops);
router.get("/seed", adminMiddleware, fillShops);

export default router;
