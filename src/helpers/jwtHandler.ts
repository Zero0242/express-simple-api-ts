import jwt from "jsonwebtoken";
import { JWT_KEY, JWT_DURATION } from "../config";

export const signJWT = (payload: any): string => {
  return jwt.sign({ payload }, JWT_KEY!, { expiresIn: `${JWT_DURATION}` });
};

export const checkJWT = (token: string) => {
  return jwt.verify(token, JWT_KEY!);
};
