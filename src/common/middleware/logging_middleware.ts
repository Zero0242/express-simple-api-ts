import morgan from "morgan";
import winston from "winston";

const { combine, timestamp, align, prettyPrint, cli } = winston.format;

const logger = winston.createLogger({
	level: "http",
	format: combine(
		timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
		winston.format.simple(),
		align()
	),
	transports: [new winston.transports.Console()],
});

export function LoggingMiddleware() {
	return morgan(
		":method :url :status :res[content-length] - :response-time ms",
		{
			stream: {
				// Configure Morgan to use our custom logger with the http severity
				write: (message) =>
					logger.http(message.trim().replace("undefined", "")),
			},
		}
	);
}
