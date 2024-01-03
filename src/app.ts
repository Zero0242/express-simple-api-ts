import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AuthRoutes } from "./routes";

const app = express();

/* Configuracion Middleware */
app.use(morgan("combined"));
app.use(express.json());
app.use(cors({ origin: "*" }));

/* Configuracion Rutas */
app.use("/auth", AuthRoutes);

export default app;
