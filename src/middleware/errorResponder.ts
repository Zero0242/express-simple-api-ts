import { NextFunction, Request, Response } from "express";

const errorResponder = (
  error: Error,
  req: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  const status = 400;
  response.status(status).json({ ok: false, error: error.message });
};

export { errorResponder };
