import {
	IsDateString,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class UpdateEventDto {
	@IsDateString()
	@IsOptional()
	start?: Date;

	@IsDateString()
	@IsOptional()
	end?: Date;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	title?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	notes?: string;
}
