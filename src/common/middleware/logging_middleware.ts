import morgan from "morgan";
import winston from "winston";

const { combine, timestamp, align, prettyPrint, cli } = winston.format;

const logger = winston.createLogger({
	level: "http",
	format: combine(
		timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
		winston.format.simple(),
		align()
	),
	transports: [new winston.transports.Console()],
});

/// * Formatos dev, combined,common,short
export function LoggingMiddleware(
	format?: "dev" | "combined" | "common" | "short" | "tiny"
) {
	if (format) {
		return morgan(format, {
			stream: {
				write: (message) => {
					logger.info(message);
				},
			},
		});
	}

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
