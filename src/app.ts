import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";
import { AuthRouter } from "./auth";
import { ChatGateway } from "./chat";
import { logger } from "./common/helpers";
import { LoggingMiddleware } from "./common/middleware";
import { EmailAdapter, envs, FirebaseAdapter } from "./config";
import { Database } from "./database";
import { EventRouter } from "./events";
import { UploadsRouter } from "./uploads";

export class ServerApp {
	private readonly app;
	private readonly server;
	private readonly socket;
	constructor() {
		this.app = express();
		this.server = http.createServer(this.app);
		this.socket = new Server(this.server, { cors: { origin: "*" } });
	}

	/**
	 * Configura el middleware utilizado
	 */
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
		this.app.set("view engine", "ejs");
	}

	/**
	 * Configura las rutas del api
	 */
	#setRoutes() {
		this.app.use("/api", AuthRouter);
		this.app.use("/api", EventRouter);
		this.app.use("/api", UploadsRouter);
	}

	/**
	 * Configuracion de Websockets
	 */
	#setSockets() {
		new ChatGateway(this.socket);
	}

	/**
	 * Configuracion de Database y servicios externos
	 */
	async #setServices() {
		const app = FirebaseAdapter.initialize();
		if (app) logger.info("Firebase Status: OK!");
		await EmailAdapter.create({
			email: envs.EMAIL_USER,
			host: envs.EMAIL_HOST,
			password: envs.EMAIL_PASS,
			port: envs.EMAIL_PORT,
			service: envs.EMAIL_SERVICE,
		});
		await Database.connect({
			type: "postgres",
			host: envs.DATABASE_HOST,
			port: envs.DATABASE_PORT,
			username: envs.DATABASE_USER,
			password: envs.DATABASE_PASS,
			database: envs.DATABASE_NAME,
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
			// solo en modo dev
			synchronize: true,
			migrationsRun: true,
		});
	}

	/**
	 * Configura todo el server
	 */
	async configure() {
		this.#setMiddleware();
		await this.#setServices();
		this.#setRoutes();
		this.#setSockets();
	}

	/**
	 * Ejecuta el servidor
	 * @param port puerto a exponer
	 */
	listen(port: number) {
		this.server.listen(port, () => logger.info(`App corriendo en ${port}`));
	}
}
