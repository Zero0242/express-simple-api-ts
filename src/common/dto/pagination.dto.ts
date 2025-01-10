import { Type } from "class-transformer";
import { IsOptional, Min } from "class-validator";

export class PaginationDTO {
	@IsOptional()
	@Min(0)
	@Type(() => Number)
	offset: number = 0;

	@IsOptional()
	@Min(0)
	@Type(() => Number)
	limit: number = 10;
}
