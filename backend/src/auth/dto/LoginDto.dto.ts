import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(15)

    password!: string;

}