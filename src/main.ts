import "reflect-metadata";
import { ServerApp } from "./app";
import { envs } from "./config";

async function bootstrap() {
	const app = new ServerApp();
	await app.configure();
	app.listen(envs.PORT);
}

bootstrap();
