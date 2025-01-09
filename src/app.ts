import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { envs } from "./config";
import { connectToDatabase } from "./database";

export class ServerApp {
	private readonly app;
	constructor() {
		this.app = express();
	}

	#setMiddleware() {
		this.app.use(
			helmet({
				contentSecurityPolicy: false,
			})
		);
		this.app.use(express.json());
		this.app.use(express.static("public"));
		this.app.use(morgan("dev"));
		this.app.use(cors({ origin: "*" }));
	}

	#setRoutes() {
		this.app.get("/api", function (req, res) {
			res.json({
				ok: true,
				message: "Hello",
			});
		});
	}

	async configure() {
		this.#setMiddleware();
		await connectToDatabase({
			type: "postgres",
			host: envs.DATABASE_HOST,
			port: envs.DATABASE_PORT,
			username: envs.DATABASE_USER,
			password: envs.DATABASE_PASS,
			database: envs.DATABASE_NAME,
			synchronize: true,
		});
		this.#setRoutes();
	}

	listen(port: number) {
		this.app.listen(port, () => console.log(`App corriendo en ${port}`));
	}
}
