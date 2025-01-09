import {
	IsEmail,
	IsString,
	IsStrongPassword,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	@MinLength(1)
	name: string;

	@IsString()
	@MinLength(1)
	lastname: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsStrongPassword()
	password: string;
}
