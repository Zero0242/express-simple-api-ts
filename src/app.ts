import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AuthRoutes } from "./routes";
import helmet from "helmet";

const app = express();

/* Configuracion Middleware */
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan("combined"));
app.use(cors({ origin: "*" }));

/* Configuracion Rutas */
app.use("/auth", AuthRoutes);

export default app;
