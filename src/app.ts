import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AuthRoutes, PostRoutes } from "./routes";
import helmet from "helmet";

const app = express();

/* Configuracion Middleware */
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

/* Configuracion Rutas */
app.use("/auth", AuthRoutes);
app.use("/api/post", PostRoutes);

export default app;
