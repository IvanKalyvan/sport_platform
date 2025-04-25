import { IsNotEmpty, IsEmail, IsString, IsNumber, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

class LocationDto {

    @IsNotEmpty({message: 'Please, choose position'})
    @IsNumber()
    latitude!: number;

    @IsNotEmpty({message: 'Please, choose position'})
    @IsNumber()
    longitude!: number;

}

class PositionDto {

    @IsNotEmpty({message: 'Please, choose position'})
    @IsString()
    city!: string;

    @IsNotEmpty({message: 'Please, choose position'})
    @IsString()
    country!: string;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location!: LocationDto;

}

export class CreateGroundDto {

    @IsNotEmpty()
    @IsEmail()
    user_email!: string;

    @IsNotEmpty({message: 'Please, feel ground title'})
    @IsString()
    ground_title!: string;

    @IsNotEmpty({message: 'Please, feel ground title'})
    @ValidateNested()
    @IsObject()
    @Type(() => PositionDto)
    position!: PositionDto;

    @IsNotEmpty({message: 'Please, choose type'})
    @IsString()
    type!: string;

}