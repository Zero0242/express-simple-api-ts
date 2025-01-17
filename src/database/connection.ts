import {
	DataSource,
	EntityTarget,
	ObjectLiteral,
	Repository,
	type DataSourceOptions,
} from "typeorm";
import { logger } from "../common/helpers";

class Database {
	private static instance: DataSource;

	private constructor() {}

	public static async connect(options: DataSourceOptions): Promise<DataSource> {
		if (!Database.instance) {
			try {
				Database.instance = new DataSource(options);
				await Database.instance.initialize();
				logger.log("info", "Conexión exitosa");
			} catch (error) {
				logger.error(error);
				process.exit(1);
			}
		}
		return Database.instance;
	}

	public static of<T extends ObjectLiteral>(
		target: EntityTarget<T>
	): Repository<T> {
		if (!Database.instance) throw Error("Debes iniciar la base de datos");
		return Database.instance.getRepository(target);
	}
}

export { Database };
