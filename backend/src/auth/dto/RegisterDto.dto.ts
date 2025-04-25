import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class RegisterDto {

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(15)

    password!: string;

    @IsNotEmpty({message: 'Please, select role'})
    @IsString()

    user_type!: string;

}