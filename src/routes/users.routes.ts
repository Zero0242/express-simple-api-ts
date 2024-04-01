import { Router } from "express";
import { Usuario } from "../models";
import { parseInt } from "../helpers";

const router = Router();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) ?? 10;
  const offset = parseInt(req.query.offset) ?? 0;
  const usuarios = await Usuario.find({}, undefined, { limit, skip: offset });
  res.json({ ok: true, msg: "usuarios", usuarios });
});

export default router;
