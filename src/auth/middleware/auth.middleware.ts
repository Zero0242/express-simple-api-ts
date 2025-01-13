import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import * as UserService from "../services";
import { UserRol } from "../types/UserRol.enum";

export function AuthMiddleware(...roles: UserRol[]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const rolesMetadata: string[] = roles.map((e) => e.toString());
			let bearer: string = req.headers["x-token"]?.toString() ?? "";
			bearer = bearer.replace("Bearer ", "");
			const validate = await JwtAdapter.validate(bearer);
			if (!validate) throw Error("Acceso no autorizado");
			const user = await UserService.findUserById(validate.id);
			if (!user) throw Error("Acceso no autorizado");
			// @ts-ignore
			req.user = user as User;
			// Validar roles
			// Ya tenemos acceso al usuario en el objeto request
			// Por alguna razon se nos jode el formato?
			if (rolesMetadata.length == 0) return next();

			for (const rol in user.roles.join("-").split("-")) {
				if (rolesMetadata.includes(rol)) {
					return next();
				}
			}

			throw Error("Sin rol autorizado");
		} catch (error) {
			return res
				.status(400)
				.json({ ok: false, message: "Acceso no autorizado" });
		}
	};
}
