import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { Server, Socket } from "socket.io";
import { logger } from "../common/helpers";
import { JwtAdapter } from "../config";
import { chatevents } from "./chat-events";
import { CreateMessageDto } from "./dto";
import * as ChatService from "./service";

export class ChatGateway {
	private readonly namespace;
	constructor(private readonly io: Server) {
		this.namespace = io.of("chat");
		this.#onInit();
	}

	#onInit() {
		this.namespace.on("connection", async (client: Socket) => {
			const user = await this.#verifyUser(client, true);
			if (!user) return client.disconnect();
			// Usuario conectado
			console.log(`Conectado ${user.id}`);
			client.join(user.id);

			this.#notifyUsers();
			this.namespace.on(chatevents["user-message"], async (message) => {
				const messagedto = plainToInstance(CreateMessageDto, message);
				try {
					await validateOrReject(messagedto);
					this.#chatPersonal(message);
				} catch (error) {
					logger.error(error);
				}
			});

			client.on("disconnect", async (reason) => {
				await this.#verifyUser(client, false);
				console.log(`Desconectado ${client.id} - ${reason}`);
				this.#notifyUsers();
			});
		});
	}

	// * Notifica los usuarios conectados
	async #notifyUsers() {
		this.namespace.emit(
			chatevents["active-users"],
			await ChatService.getConnectedUsers()
		);
	}

	// * Controla la conexion del usuario y la actualizacion de data
	async #verifyUser(client: Socket, connection: boolean) {
		const token = client.handshake.auth["x-token"];
		if (!token) return undefined;
		const jwtpayload = await JwtAdapter.validate(token);
		if (!jwtpayload) return undefined;
		const user = await ChatService.handleUserConnection(
			jwtpayload.id,
			connection
		);
		if (!user) return undefined;
		return user;
	}

	// * Controla el evento del mensaje
	async #chatPersonal(message: CreateMessageDto) {
		const sentmessage = await ChatService.createMessage(message);
		if (!sentmessage) return;

		this.namespace
			.to(message.from)
			.to(message.to)
			.emit(chatevents["user-message"], {
				id: sentmessage.id,
				senderId: message.from,
				recipientId: message.to,
				message: sentmessage.id,
				attachment: sentmessage.attachment,
				created_at: sentmessage.created_at,
			});
	}
}
