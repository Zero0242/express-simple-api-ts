import * as firebase from "firebase-admin";
import {
	getMessaging,
	type Message,
	type MulticastMessage,
} from "firebase-admin/messaging";

interface MessagingResult {
	ok: boolean;
	result: string;
	error?: string;
}

interface NotificationBody {
	metadata: Record<string, string>;
	title: string;
	body: string;
	imageUrl?: string;
}

export class FirebaseAdapter {
	/**
	 * Inicializa la app, es necesario tener configurado el valor de entorno
	 * - `GOOGLE_APPLICATION_CREDENTIALS`
	 *
	 * además del archivo de firebase.json
	 */
	static initialize(): firebase.app.App | undefined {
		try {
			return firebase.initializeApp({
				credential: firebase.credential.applicationDefault(),
			});
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Sends a notification to a user via Firebase Cloud Messaging.
	 *
	 * @param token - The device token to which the notification will be sent.
	 * @param options - The notification body containing the notification details and metadata.
	 * @returns A promise that resolves to a `MessagingResult` indicating the success or failure of the notification sending process.
	 */
	static async notifyUser(
		token: string,
		options: NotificationBody
	): Promise<MessagingResult> {
		const message: Message = {
			token: token,
			notification: options,
			data: options.metadata,
		};

		const result: MessagingResult = await getMessaging()
			.send(message)
			.then((token) => ({ ok: true, result: token }))
			.catch((error) => ({
				ok: false,
				result: "Error",
				error: `No se puedo enviar la notificacion: ${error}`,
			}));

		return result;
	}

	/**
	 * Envia notificaciones a multiples usuarios
	 * @param tokens listado de tokens a notificar
	 * @param options cuerpo del mensaje
	 * @returns Resultado del envio masivo
	 */
	static async notifyMultipleUsers(
		tokens: string[],
		options: NotificationBody
	): Promise<MessagingResult> {
		const messages: MulticastMessage = {
			tokens: tokens,
			data: options.metadata,
			notification: options,
		};

		const { failureCount, responses, successCount } =
			await getMessaging().sendEachForMulticast(messages);
		const results: string = responses.map((e) => e.messageId ?? "").join("\n");
		const errors: string = responses
			.map((e) => e.error?.message ?? "")
			.join("\n");

		return {
			ok: successCount === tokens.length,
			result: results,
			error: `Hubo un error al enviar ${failureCount} notificaciones\n${errors}`,
		};
	}
}
