import { NextFunction, Request, Response } from "express";
import { authGuard } from "./authGuard";
import { errorResponse } from "../helpers";

const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  console.log(req.userIsAdmin);

  // @ts-ignore
  if (req.userIsAdmin) {
    return next();
  }

  return errorResponse({ res, message: "Usuario no autorizado" });
};

export const adminMiddleware = [authGuard, adminGuard];
