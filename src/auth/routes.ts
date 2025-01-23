import ejs from "ejs";
import express from "express";
import { join } from "path";
import {
	FileType,
	UploadMiddleware,
	ValidationMiddleware,
} from "../common/middleware";
import { AuthService } from "./auth.service";
import {
	CheckUserDto,
	CreateUserDto,
	RecoverPasswordDto,
	ResetPasswordDto,
} from "./dto";
import { User } from "./entities";
import { AuthMiddleware } from "./middleware";
import { SupportService } from "./support.service";
const router = express.Router();

router.post(
	"/auth/signup",
	ValidationMiddleware(CreateUserDto),
	async function (req, res) {
		const createUserDto: CreateUserDto = req.body;
		const result = await AuthService.registerUser(createUserDto);
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
		const result = await AuthService.loginUser(checkUserDto);
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
		const result = AuthService.createAuthResponse(user);
		return res.json(result);
	}
);

router.post(
	"/auth/avatar",
	AuthMiddleware(),
	UploadMiddleware({
		destination: "static/user-avatars",
		fieldname: "archivo",
		fileType: FileType.IMAGE,
	}),
	async (req, res) => {
		if (!req.file) {
			return res
				.status(400)
				.json({ ok: false, message: "Debes subir un archivo valido" });
		}
		// @ts-ignore
		const user = req.user as User;

		const avatar = await AuthService.updateUserAvatar(user, req.file);
		return res.json({ ok: true, avatar: avatar });
	}
);

// * ==============================
// * SUPPORT FEATURES
// * ==============================
router.post(
	"/auth/password-reset",
	ValidationMiddleware(RecoverPasswordDto),
	async (req, res) => {
		try {
			const recoveryDto: RecoverPasswordDto = req.body;
			await SupportService.sendRecoveryEmail(recoveryDto.email);

			return res.json({
				ok: true,
				result: `Mensaje enviado a su correo ${recoveryDto.email}`,
			});
		} catch (error) {
			return res
				.status(400)
				.json({ ok: false, message: (error as Error)?.message });
		}
	}
);

router.get("/auth/password-reset/:token", async (req, res) => {
	const token = req.params.token;

	const result = await SupportService.verifyToken(token);

	if (!result) {
		return res.status(400).json({
			ok: false,
			message: `Error: Invalid Requests`,
		});
	}
	const html = await ejs.renderFile(
		join(__dirname, "templates", "reset-password.ejs"),
		{ token }
	);

	return res.send(html);
});

router.post(
	"/auth/password-reset/:token",
	ValidationMiddleware(ResetPasswordDto),
	async (req, res) => {
		try {
			const { token } = req.params;
			const user = await SupportService.resetPassword(
				token,
				req.body as ResetPasswordDto
			);

			return res.json({ ok: true, user: user.toJson() });
		} catch (error) {
			return res.status(500).json({
				ok: false,
				message: (error as Error)?.message ?? "Something went wrong!",
			});
		}
	}
);

export const AuthRouter = router;
