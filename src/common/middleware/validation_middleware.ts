import { plainToClass } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

type RequestPart = "body" | "params" | "query";

export function ValidationMiddleware<T extends new () => any>(
	DtoClass: T,
	object: RequestPart = "body"
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = plainToClass(DtoClass, req[object]);
			await validateOrReject(dto);
			req[object] = dto;
			next();
		} catch (error) {
			if (Array.isArray(error)) {
				const errors: ValidationError[] = error;
				return res.status(400).json({
					ok: false,
					message: errors.map((e) =>
						e.toString().split("-")[1].replace("\n", "").trim()
					),
				});
			}

			return res.status(500).json({
				ok: false,
				message: `Internal Server Error`,
			});
		}
	};
}
