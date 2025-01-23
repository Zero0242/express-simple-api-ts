import crypto from "crypto";
import * as datefns from "date-fns";
import * as ejs from "ejs";
import { join } from "path";
import { logger } from "../common/helpers";
import { BcryptAdapter, EmailAdapter, envs } from "../config";
import { Database } from "../database";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ForgotPassword, User } from "./entities";

// * ==============================
// * SUPPORT FEATURES
// * ==============================
export class SupportService {
	public static sendRecoveryEmail = async (email: string) => {
		const repository = Database.of(ForgotPassword);
		const usersRepository = Database.of(User);
		// Validar al usuario primero
		const user = await usersRepository.findOneBy({ email });
		if (!user) throw Error("Usuario no encontrrado");

		const code = crypto.randomBytes(20).toString("hex");
		const expiresAt: Date = datefns.add(new Date(), { minutes: 20 });

		const forgotPassword = repository.create({ code, user, expiresAt });
		await repository.save(forgotPassword);

		const html = await ejs.renderFile(
			join(__dirname, "templates", "email.ejs"),
			{
				url: envs.BASE_URL,
				token: forgotPassword.id,
				code: code,
			}
		);

		await EmailAdapter.send({
			from: "Express App <no-reply@expressapp.com>",
			to: email,
			subject: "Password Recovery",
			html: html,
		});

		return `Correo enviado correctamente a ${email}`;
	};

	public static verifyToken = async (id: string) => {
		try {
			const repository = Database.of(ForgotPassword);
			const result = await repository.findOneBy({ id });
			if (!result) throw Error("No existe el token");
			if (result.isExpired) throw Error("El token ya a expirado");
			return result;
		} catch (error) {
			logger.error(error);
			return undefined;
		}
	};

	public static resetPassword = async (
		token: string,
		{ code, confirmpassword, newpassword }: ResetPasswordDto
	) => {
		const repository = Database.of(ForgotPassword);
		const usersRepository = Database.of(User);
		const forgotPassword = await SupportService.verifyToken(token);
		if (!forgotPassword) throw Error("No es valido el token");
		if (confirmpassword !== newpassword) {
			throw Error("Las contraseñas son invalidas");
		}
		if (code !== forgotPassword.code) {
			throw Error("Codigo no válido");
		}

		const hash = await BcryptAdapter.encrypt(confirmpassword);
		const user = forgotPassword.user;

		user.password = hash;
		await usersRepository.save(user);
		await repository.delete({ user: user });

		return user;
	};
}
