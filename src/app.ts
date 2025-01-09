import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { AuthRouter } from "./auth";
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
		this.app.use(morgan("tiny"));
		this.app.use(cors({ origin: "*" }));
	}

	#setRoutes() {
		this.app.use("/api", AuthRouter);
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
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
		});
		this.#setRoutes();
	}

	listen(port: number) {
		this.app.listen(port, () => console.log(`App corriendo en ${port}`));
	}
}
