import { type Transporter, createTransport } from "nodemailer";
import type { Options } from "nodemailer/lib/mailer";
import { logger } from "../../common/helpers";

interface TransporterOptions {
	email: string;
	password: string;
	service: string;
	host: string;
	port: number;
}

export class EmailAdapter {
	static transport: Transporter;

	private constructor() {}

	static async create(options: TransporterOptions): Promise<Transporter> {
		if (!EmailAdapter.transport) {
			try {
				const transport = createTransport({
					service: options.service,
					host: options.host,
					port: options.port,
					auth: {
						user: options.email,
						pass: options.password,
					},
				});
				await transport.verify();
				logger.info("Email Transport Ready!");
				EmailAdapter.transport = transport;
			} catch (error) {
				logger.error(error);
			}
		}

		return EmailAdapter.transport;
	}

	static async send(options: Options) {
		if (!EmailAdapter.transport) {
			throw Error("Must configure email credentials in server");
		}
		return await EmailAdapter.transport.sendMail(options);
	}
}
