import { Response } from "express";

interface ErrorProps {
  res: Response;
  message?: string;
  code?: number;
}

export const errorResponse = ({
  res,
  message = "Error",
  code = 400,
}: ErrorProps): Response => {
  return res.status(code).json({ ok: false, message });
};
