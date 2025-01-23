import { IsEmail, IsString } from "class-validator";

export class RecoverPasswordDto {
	@IsEmail()
	@IsString()
	email: string;
}
