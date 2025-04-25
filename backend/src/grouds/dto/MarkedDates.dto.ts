import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class MarkedDatesDto {

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    objectId!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    year!: number;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    month!: number;
}