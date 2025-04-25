import { IsEmail, IsNotEmpty } from "class-validator";

export class GamerEmailDto {

    @IsEmail()
    @IsNotEmpty()
    email!: string;

}