import {IsNotEmpty, IsString } from "class-validator";

export class DeleteGroundDto {

    @IsNotEmpty()
    @IsString()
    id!: number;

}