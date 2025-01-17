import { User } from "../auth";
import { PaginationDTO } from "../common/dto";
import { Database } from "../database";
import { CreateEventDto, UpdateEventDto } from "./dto";
import { Evento } from "./entities";

export async function create(
	createEventDto: CreateEventDto,
	user: User
): Promise<Evento> {
	const repository = Database.of(Evento);
	const evento = repository.create({
		user: user,
		...createEventDto,
	});
	const result = await repository.save(evento);
	// @ts-ignore
	delete result.user;
	return result;
}

export async function findAll(paginationDto: PaginationDTO): Promise<Evento[]> {
	const { limit, offset } = paginationDto;
	const valores = await Database.of(Evento).find({
		take: limit,
		skip: offset,
	});
	return valores;
}

export async function findOne(id: string): Promise<Evento | null> {
	const evento = await Database.of(Evento).findOneBy({ id });
	if (!evento) return null;

	return evento;
}

export async function update(
	id: string,
	updateEventDto: UpdateEventDto
): Promise<Evento | null> {
	const repository = Database.of(Evento);
	const evento = await repository.preload({
		id: id,
		...updateEventDto,
	});

	if (!evento) return null;
	return await repository.save(evento);
}

export async function remove(id: string): Promise<Evento | null> {
	const evento = await findOne(id);

	await Database.of(Evento).delete({ id });
	return evento;
}

export async function eventCount(): Promise<number> {
	return await Database.of(Evento).count();
}
