import { IsArray, IsOptional, IsString } from "class-validator";

export class SavePreconsultationDto {
  @IsString()
  appointmentId: string;

  @IsOptional() @IsString()
  chiefComplaint?: string;

  @IsOptional() @IsArray()
  symptoms?: string[];

  @IsOptional() @IsString()
  onset?: string;

  @IsOptional() @IsString()
  meds?: string;

  @IsOptional() @IsString()
  history?: string;

  @IsOptional()
  files?: { name: string; url?: string }[];
}
