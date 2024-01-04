import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_CNN =
  process.env.MONGO_CNN ?? "mongodb://localhost:27017/express-db";

const JWT_KEY = process.env.JWT_KEY;
const JWT_DURATION = process.env.JWT_DURATION;
const NODE_ENV = process.env.NODE_ENV ?? "dev";

export { PORT, MONGO_CNN, JWT_KEY, JWT_DURATION, NODE_ENV };
