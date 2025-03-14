import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export class ConfirmResetPasswordDto {

    @IsString()
    @IsUUID()
    @IsNotEmpty()

    token!: string;

    @IsString()
    @IsNotEmpty()

    password!: string;

}