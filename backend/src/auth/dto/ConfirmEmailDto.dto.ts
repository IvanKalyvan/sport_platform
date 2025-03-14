import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export class ConfirmEmailDto {

    @IsUUID()
    @IsNotEmpty()
    @IsString()

    token!: string;

}