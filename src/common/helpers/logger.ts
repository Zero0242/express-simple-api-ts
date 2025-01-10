import * as winston from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, cli, printf, align, prettyPrint } = winston.format;

export const logger = winston.createLogger({
	level: "info",
	format: combine(
		cli({ all: true }),
		timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
		align(),
		printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
	transports: [
		new winston.transports.Console(),
		// * Valores combinados
		new winston.transports.DailyRotateFile({
			filename: "logs/combined-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			maxFiles: "7d",
		}),
		// * Valores de error
		new winston.transports.DailyRotateFile({
			filename: "logs/error-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			maxFiles: "7d",
			level: "error",
		}),
	],
});
