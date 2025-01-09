import "dotenv/config";
import * as Joi from "joi";

interface EnvVars {
	PORT: number;
	DATABASE_HOST: string;
	DATABASE_PORT: number;
	DATABASE_USER: string;
	DATABASE_PASS: string;
	DATABASE_NAME: string;
	JWT_KEY: string;
	JWT_DURATION: string;
}

const schema = Joi.object<EnvVars>({
	PORT: Joi.number().required(),
	DATABASE_HOST: Joi.string().required(),
	DATABASE_PORT: Joi.number().required(),
	DATABASE_NAME: Joi.string().required(),
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASS: Joi.string().required(),
}).unknown(true);

const { value, error } = schema.validate(process.env);

if (error) throw new Error(`Faltan configuraciones ${error.message}`);

const envVars: EnvVars = value;

export const envs: EnvVars = {
	PORT: envVars.PORT,
	DATABASE_HOST: envVars.DATABASE_HOST,
	DATABASE_NAME: envVars.DATABASE_NAME,
	DATABASE_PASS: envVars.DATABASE_PASS,
	DATABASE_PORT: envVars.DATABASE_PORT,
	DATABASE_USER: envVars.DATABASE_USER,
	JWT_DURATION: envVars.JWT_DURATION,
	JWT_KEY: envVars.JWT_KEY,
};
