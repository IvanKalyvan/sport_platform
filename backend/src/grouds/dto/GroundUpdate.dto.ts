import { IsEmail, IsString, IsNumber, ValidateNested, IsObject, IsOptional, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

class LocationDto {

    @IsOptional()
    @IsNumber()
    latitude!: number;

    @IsOptional()
    @IsNumber()
    longitude!: number;

}

class PositionDto {

    @IsOptional()
    @IsString()
    city!: string;

    @IsOptional()
    @IsString()
    country!: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location!: LocationDto;

}

export class UpdateGroundDto {

    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsNotEmpty()
    @IsEmail()
    user_email!: string;

    @IsOptional()
    @IsString()
    ground_title!: string;

    @IsOptional()
    @ValidateNested()
    @IsObject()
    @Type(() => PositionDto)
    position!: PositionDto;

    @IsOptional()
    @IsString()
    type!: string;

}