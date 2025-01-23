import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
	@IsString()
	@IsNotEmpty()
	code: string;

	@IsString()
	@IsStrongPassword()
	confirmpassword: string;

	@IsString()
	@IsStrongPassword()
	newpassword: string;
}
