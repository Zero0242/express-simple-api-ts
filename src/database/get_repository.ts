import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { connection } from "./connection";

export function GetRepository<T extends ObjectLiteral>(
	target: EntityTarget<T>
): Repository<T> {
	return connection.getRepository(target);
}
