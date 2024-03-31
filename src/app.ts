import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
//import { v2 as cloudinary } from "cloudinary";
import { AuthRoutes, PostRoutes, ShopRoutes } from "./routes";

//cloudinary.config("xxxxx");

const app = express();

/* Configuracion Middleware */
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
    debug: false,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

/* Configuracion Rutas */
app.use("/auth", AuthRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/shop", ShopRoutes);

export default app;
