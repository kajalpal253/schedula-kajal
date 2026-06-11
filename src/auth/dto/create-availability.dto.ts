import { IsNumber,IsString } from "class-validator";

export class CreateAvailabilityDto {
    @IsNumber()
    dayOfWeek!: number;

    @IsString()
    startTime!: string;

    @IsString()
    endTime!:string;
}