import cors from "cors";
import express from "express";
import helmet from "helmet";
import { AuthRouter } from "./auth";
import { logger } from "./common/helpers";
import { LoggingMiddleware } from "./common/middleware";
import { envs } from "./config";
import { connectToDatabase } from "./database";
import { EventRouter } from "./events";

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
		this.app.use(LoggingMiddleware());
		this.app.use(cors({ origin: "*" }));
	}

	#setRoutes() {
		this.app.use("/api", AuthRouter);
		this.app.use("/api", EventRouter);
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
			// solo en modo dev
			synchronize: true,
			migrationsRun: true,
			// entities: [Evento, User],
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
		});
		this.#setRoutes();
	}

	listen(port: number) {
		this.app.listen(port, () => logger.info(`App corriendo en ${port}`));
	}
}
