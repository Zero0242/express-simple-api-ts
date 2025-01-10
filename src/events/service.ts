import { User } from "../auth";
import { PaginationDTO } from "../common/dto";
import { GetRepository } from "../database";
import { CreateEventDto, UpdateEventDto } from "./dto";
import { Evento } from "./entities";

export async function create(
	createEventDto: CreateEventDto,
	user: User
): Promise<Evento> {
	const evento = GetRepository(Evento).create({
		user: user,
		...createEventDto,
	});
	const result = await GetRepository(Evento).save(evento);
	// @ts-ignore
	delete result.user;
	return result;
}

export async function findAll(paginationDto: PaginationDTO): Promise<Evento[]> {
	const { limit, offset } = paginationDto;
	const valores = await GetRepository(Evento).find({
		take: limit,
		skip: offset,
	});
	return valores;
}

export async function findOne(id: string): Promise<Evento | null> {
	const evento = await GetRepository(Evento).findOneBy({ id });
	if (!evento) return null;

	return evento;
}

export async function update(
	id: string,
	updateEventDto: UpdateEventDto
): Promise<Evento | null> {
	const evento = await GetRepository(Evento).preload({
		id: id,
		...updateEventDto,
	});

	if (!evento) return null;
	return await GetRepository(Evento).save(evento);
}

export async function remove(id: string): Promise<Evento | null> {
	const evento = await findOne(id);

	await GetRepository(Evento).delete({ id });
	return evento;
}

export async function eventCount(): Promise<number> {
	return await GetRepository(Evento).count();
}
