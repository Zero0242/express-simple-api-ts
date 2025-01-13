import { DataSource, type DataSourceOptions } from "typeorm";
import { logger } from "../common/helpers";

let connection: DataSource;

async function connectToDatabase(options: DataSourceOptions) {
	try {
		connection = new DataSource(options);
		await connection.initialize();
		logger.log("info", "Conexión exitosa");
		return connection;
	} catch (error) {
		logger.error(error);
		process.exit(1);
	}
}

export { connection, connectToDatabase };
