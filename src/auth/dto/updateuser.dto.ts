import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class UpdateUserDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    @MinLength(6)
    password: string
}