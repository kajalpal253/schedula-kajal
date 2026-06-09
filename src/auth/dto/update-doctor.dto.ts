import { CreateDoctorDto } from "./create-doctor.dto";
import {PartialType} from '@nestjs/mapped-types'

export class UpdateDoctorDto extends PartialType(CreateDoctorDto){}