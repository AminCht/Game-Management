import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class GameDto{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    profile_id: number  
}
export class UpdateGameDto{
    @IsNotEmpty()
    name: string
}