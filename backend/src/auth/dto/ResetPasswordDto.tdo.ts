import {IsEmail, IsJWT, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(15)

    password!: string;

    @IsOptional()
    @IsString()
    @IsJWT()

    access_token!: string | undefined;

}