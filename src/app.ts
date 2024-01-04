import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { AuthRoutes, PostRoutes, ShopRoutes } from "./routes";
import { errorResponder } from "./middleware/";

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
app.use("/api/shop", ShopRoutes);

app.use(errorResponder);
export default app;
