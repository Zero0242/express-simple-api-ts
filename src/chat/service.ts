import { User } from "../auth";
import { Database } from "../database";
import { CreateMessageDto } from "./dto";
import { Message } from "./entities/message.entity";

export async function handleUserConnection(
	id: string,
	online: boolean
): Promise<User | undefined> {
	const repository = Database.of(User);
	const user = await repository.findOneBy({ id });
	if (!user) return undefined;
	user.online = online;
	await repository.save(user);
	return user;
}

export async function getConnectedUsers(): Promise<User[]> {
	const repository = Database.of(User);

	const users = await repository.find({ where: { online: true } });
	return users;
}

export async function createMessage(
	createMessageDto: CreateMessageDto
): Promise<Message | null> {
	const usersrepository = Database.of(User);
	const repository = Database.of(Message);

	const [from, to] = await Promise.all([
		usersrepository.findOneBy({ id: createMessageDto.from }),
		usersrepository.findOneBy({ id: createMessageDto.to }),
	]);
	// Si no existen los usuarios no retorna nada
	if (from === null || to === null) return null;

	const message = repository.create({
		to: to,
		from: from,
		message: createMessageDto.message,
	});

	return await repository.save(message);
}
