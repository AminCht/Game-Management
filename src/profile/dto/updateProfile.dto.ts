import { IsOptional } from "class-validator"
export class UpdateProfileDto{
    @IsOptional()
    avatar: string
    @IsOptional()
    level: number
}
