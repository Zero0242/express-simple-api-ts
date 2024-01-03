import { NextFunction, Request, Response } from "express";
import { checkJWT, errorResponse } from "../helpers";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("No Autorizado");
    
    const parsedHeader = authorization.split(" ");
    const token: string | undefined = parsedHeader[1] ?? parsedHeader[0];
    
    if (!token) throw new Error("No Autorizado");

    const decodedUser = checkJWT(token);
    // @ts-ignore
    req.user = decodedUser.payload;

    next();
  } catch (error) {
    return errorResponse({ res, message: "No autorizado" });
  }
};
