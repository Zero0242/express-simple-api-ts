import "dotenv/config";
import * as Joi from "joi";

interface EnvVars {
	// * SERVER
	BASE_URL: string;
	PORT: number;
	// * DATABASE
	DATABASE_HOST: string;
	DATABASE_PORT: number;
	DATABASE_USER: string;
	DATABASE_PASS: string;
	DATABASE_NAME: string;
	// * JWT
	JWT_KEY: string;
	JWT_DURATION: string;
	// * EMAIL
	EMAIL_SERVICE: string;
	EMAIL_HOST: string;
	EMAIL_PORT: number;
	EMAIL_USER: string;
	EMAIL_PASS: string;
}

const schema = Joi.object<EnvVars>({
	// * SERVER
	BASE_URL: Joi.string().default("http://127.0.0.1:8000").optional(),
	PORT: Joi.number().default(8000).optional(),
	// * DATABASE
	DATABASE_HOST: Joi.string().required(),
	DATABASE_PORT: Joi.number().required(),
	DATABASE_NAME: Joi.string().required(),
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASS: Joi.string().required(),

	// * JWT
	JWT_KEY: Joi.string().default("mysecretkey").required(),
	JWT_DURATION: Joi.string().default("1h").required(),

	// * EMAIL
	EMAIL_SERVICE: Joi.string().default("gmail").optional(),
	EMAIL_HOST: Joi.string().default("smtp.gmail.com").optional(),
	EMAIL_PORT: Joi.number().default(465).optional(),
	EMAIL_USER: Joi.string().default("").optional(),
	EMAIL_PASS: Joi.string().default("").optional(),
}).unknown(true);

const { value, error } = schema.validate(process.env);

if (error) throw new Error(`Faltan configuraciones ${error.message}`);

const envVars: EnvVars = value;

export const envs: EnvVars = {
	// * SERVER
	BASE_URL: envVars.BASE_URL,
	PORT: envVars.PORT,
	// * DATABASE
	DATABASE_HOST: envVars.DATABASE_HOST,
	DATABASE_NAME: envVars.DATABASE_NAME,
	DATABASE_PASS: envVars.DATABASE_PASS,
	DATABASE_PORT: envVars.DATABASE_PORT,
	DATABASE_USER: envVars.DATABASE_USER,
	// * JWT
	JWT_DURATION: envVars.JWT_DURATION,
	JWT_KEY: envVars.JWT_KEY,
	// * EMAIL
	EMAIL_SERVICE: envVars.EMAIL_SERVICE,
	EMAIL_HOST: envVars.EMAIL_HOST,
	EMAIL_PASS: envVars.EMAIL_PASS,
	EMAIL_PORT: envVars.EMAIL_PORT,
	EMAIL_USER: envVars.EMAIL_USER,
};
