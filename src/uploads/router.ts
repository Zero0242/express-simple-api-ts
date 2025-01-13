import express from "express";
import * as UploadsService from "./service";
import { Collections } from "./service";

const router = express.Router();

router.get("/uploads/avatars/:id", (req, res) => {
	const { id } = req.params;
	const path = UploadsService.verifyFile(Collections.avatars, id);
	if (!path) return res.status(404).send(`${id} Not Found`);
	res.status(200);
	return res.sendFile(path);
});

export const UploadsRouter = router;
