import { NextFunction, Request, Response } from "express";
import { checkJWT, errorResponse } from "../helpers";
import { Usuario, UsuarioDoc } from "../models";

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("No Autorizado");
    const parsedHeader = authorization.split(" ");
    const token: string | undefined = parsedHeader[1] ?? parsedHeader[0];
    if (!token) throw new Error("No Autorizado");
    const decodedUser = checkJWT(token);
    // @ts-ignore
    const { id, rol } = decodedUser.payload;
    const usuario: UsuarioDoc | null = await Usuario.findById(id);
    if (!usuario) throw new Error("No Existe");
    // @ts-ignore
    req.uid = id;
    // @ts-ignore
    req.user = usuario;
    next();
  } catch (error) {
    return errorResponse({ res, message: "No Autorizado" });
  }
};
