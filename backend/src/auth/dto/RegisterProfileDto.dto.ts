import {Min, Max, Length, IsNumber, IsNotEmpty, IsString, IsInt, IsEmail} from "class-validator";

export class RegisterProfileDto {

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(18, { message: 'Age must be greater for register' })
    age!: number;

    @IsNotEmpty()
    @IsString()
    sex!: string;

    @IsNotEmpty()
    @IsString()
    location!: string;

    @IsNotEmpty()
    @IsNumber({}, { message: 'Skill level must be a number' })
    @Min(0.01, { message: 'Skill level must be at least 0.01' })
    @Max(10.00, { message: 'Skill level must not exceed 10.00' })
    skill_lvl!: number;

    @IsNotEmpty()
    @IsString()
    @Length(50, 1000, { message: 'Your description must be between 50 and 1000 symbols' })
    experience!: string;

}