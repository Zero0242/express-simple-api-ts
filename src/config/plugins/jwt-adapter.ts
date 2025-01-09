import jwt from "jsonwebtoken";
import { envs } from "../envs";
export interface JwtPayload {
	id: string;
}

export class JwtAdapter {
	static create(payload: JwtPayload): string {
		return jwt.sign(payload, envs.JWT_KEY, { expiresIn: envs.JWT_DURATION });
	}

	static validate(token: string): Promise<JwtPayload | null> {
		return new Promise((resolve, reject) => {
			jwt.verify(token, envs.JWT_KEY, (err, result) => {
				if (err != null) {
					return resolve(null);
				}
				resolve(result as JwtPayload);
			});
		});
	}
}
