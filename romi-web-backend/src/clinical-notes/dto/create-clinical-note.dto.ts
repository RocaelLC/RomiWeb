import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateClinicalNoteDto {
  @IsUUID()
  appointmentId!: string;

  @IsString()
  @IsNotEmpty()
  subjective!: string;

  @IsString()
  @IsOptional()
  objective?: string;

  @IsString()
  @IsOptional()
  assessment?: string;

  @IsString()
  @IsOptional()
  plan?: string;

  @IsOptional()
  prescriptions?: any;

  @IsArray()
  @IsOptional()
  attachments?: any[];
}
