import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer';

export class CreateBookingDto {

    @IsNotEmpty()
    @IsNumber()
    groundId!: number;

    @IsOptional()
    @Type(() => Date)
    start_time!: Date;

    @IsOptional()
    @Type(() => Date)
    end_time!: Date;

}