import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CheckUserDto {
	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
