import express from "express";
import { ValidationMiddleware } from "../common";
import { CheckUserDto, CreateUserDto } from "./dto";
import { User } from "./entities";
import { AuthMiddleware } from "./middleware";
import * as UserService from "./services";
const router = express.Router();

router.post(
	"/auth/signup",
	ValidationMiddleware(CreateUserDto),
	async function (req, res) {
		const createUserDto: CreateUserDto = req.body;
		const result = await UserService.registerUser(createUserDto);
		if (result != null) {
			return res.status(200).json(result);
		}

		return res
			.status(500)
			.json({ ok: false, message: "Error al crear el usuario" });
	}
);

router.post(
	"/auth/login",
	ValidationMiddleware(CheckUserDto),
	async (req, res) => {
		const checkUserDto: CheckUserDto = req.body;
		const result = await UserService.loginUser(checkUserDto);
		if (result != null) {
			return res.status(200).json(result);
		}

		return res
			.status(400)
			.json({ ok: false, message: "Credenciales no validas" });
	}
);

router.get(
	"/auth/login",
	AuthMiddleware(),
	async (req: Express.Request, res) => {
		// @ts-ignore
		const user = req.user as User;
		const result = UserService.createAuthResponse(user);
		return res.json(result);
	}
);

export const AuthRouter = router;
