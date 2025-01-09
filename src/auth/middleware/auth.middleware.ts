import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import * as UserService from "../services";

export function AuthMiddleware() {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			let bearer: string = req.headers["x-token"]?.toString() ?? "";
			bearer = bearer.replace("Bearer ", "");
			const validate = await JwtAdapter.validate(bearer);
			if (!validate) throw Error("Acceso no autorizado");
			const user = await UserService.findUserById(validate.id);
			if (!user) throw Error("Acceso no autorizado");
			// @ts-ignore
			req.user = user as User;

			next();
		} catch (error) {
			return res.json({ ok: false, message: "Acceso no autorizado" });
		}
	};
}
