import { Router } from "express";
import {  getAllShops } from "../controllers";

const router = Router();

router.get("/", getAllShops);
//router.get("/seed", adminMiddleware, fillShops);
//router.post("/register", adminMiddleware, registerShop);

export default router;
