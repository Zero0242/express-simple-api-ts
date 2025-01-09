import { DataSource, type DataSourceOptions } from "typeorm";

let connection: DataSource;

async function connectToDatabase(options: DataSourceOptions) {
	try {
		connection = new DataSource(options);
		await connection.initialize();
		console.log("Conexión exitosa");
		return connection;
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

export { connection, connectToDatabase };
