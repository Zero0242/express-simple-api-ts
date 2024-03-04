import { Router } from "express";
import { adminMiddleware } from "../middleware";
import { fillShops, getAllShops, registerShop } from "../controllers";

const router = Router();

router.get("/", getAllShops);
router.get("/seed", adminMiddleware, fillShops);
router.post("/register", adminMiddleware, registerShop);

export default router;
