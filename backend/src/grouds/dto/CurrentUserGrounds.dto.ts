import {IsNotEmpty, IsEmail, IsString, IsNumber, IsOptional} from "class-validator";

export class CurrentGroundTypesDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsOptional()
    @IsNumber()
    offset!: number;

}