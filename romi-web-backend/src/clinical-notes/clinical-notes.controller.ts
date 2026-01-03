import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClinicalNotesService } from './clinical-notes.service';
import { CreateClinicalNoteDto } from './dto/create-clinical-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('clinical-notes')
export class ClinicalNotesController {
  constructor(private readonly service: ClinicalNotesService) {}

  @Post()
  @Roles('DOCTOR')
  create(@Body() dto: CreateClinicalNoteDto, @Req() req: any) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('record/:recordId')
  @Roles('DOCTOR', 'PATIENT')
  listByRecord(@Param('recordId') recordId: string, @Req() req: any) {
    return this.service.listByRecord(recordId, req.user.sub);
  }

  @Get('appointment/:appointmentId')
  @Roles('DOCTOR', 'PATIENT')
  listByAppointment(@Param('appointmentId') appointmentId: string, @Req() req: any) {
    return this.service.listByAppointment(appointmentId, req.user.sub);
  }
}
