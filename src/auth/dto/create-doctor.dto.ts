import {
    IsString,
    IsNumber,
    IsBoolean,
} from "class-validator";

export class CreateDoctorDto {
    @IsString()
    fullName!: string;

    @IsString()
    specialization!: string;

    @IsNumber()
    experience!: number;

    @IsString()
    qualification!: string;

    @IsString()
    consultationFee!: string;

    @IsString()
    availabilityHours!: string;
       
    @IsString()
    profileDetails!:string; 

}