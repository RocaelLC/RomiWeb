import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ClinicalNote } from './clinical-note.entity';
import { MedicalRecord } from '../medical-records/medical-record.entity';
import { Appointment } from '../appointments/appointment.entity';
import { CreateClinicalNoteDto } from './dto/create-clinical-note.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ClinicalNotesService {
  constructor(
    @InjectRepository(ClinicalNote)
    private readonly notesRepo: Repository<ClinicalNote>,
    @InjectRepository(MedicalRecord)
    private readonly recordsRepo: Repository<MedicalRecord>,
    @InjectRepository(Appointment)
    private readonly apptRepo: Repository<Appointment>,
  ) {}

  async create(doctorId: string, dto: CreateClinicalNoteDto) {
    const appt = await this.apptRepo.findOne({ where: { id: dto.appointmentId } });
    if (!appt) {
      throw new NotFoundException('Appointment not found');
    }

    if (appt.doctorId !== doctorId) {
      throw new ForbiddenException('This appointment is not assigned to you');
    }

    const record = await this.getOrCreateRecord(appt.patientId);

    const notePayload: DeepPartial<ClinicalNote> = {
      record: { id: record.id } as MedicalRecord,
      appointment: { id: appt.id } as Appointment,
      patient: { id: appt.patientId } as User,
      doctor: { id: doctorId } as User,
      subjective: dto.subjective,
      objective: dto.objective,
      assessment: dto.assessment,
      plan: dto.plan,
      prescriptions: dto.prescriptions,
      attachments: dto.attachments,
    };

    const note = this.notesRepo.create(notePayload);

    return this.notesRepo.save(note);
  }

  async listByRecord(recordId: string, requesterId: string) {
    const record = await this.recordsRepo.findOne({
      where: { id: recordId },
      relations: ['patient'],
    });
    if (!record) {
      throw new NotFoundException('Medical record not found');
    }

    await this.ensureAccessToRecord(record, requesterId);

    return this.notesRepo.find({
      where: { record: { id: recordId } },
      relations: ['appointment', 'doctor', 'patient'],
      order: { createdAt: 'DESC' },
    });
  }

  async listByAppointment(appointmentId: string, requesterId: string) {
    const appt = await this.apptRepo.findOne({ where: { id: appointmentId } });
    if (!appt) {
      throw new NotFoundException('Appointment not found');
    }

    const isOwner = appt.patientId === requesterId || appt.doctorId === requesterId;
    if (!isOwner) {
      throw new ForbiddenException('Insufficient role');
    }

    return this.notesRepo.find({
      where: { appointment: { id: appointmentId } },
      relations: ['appointment', 'doctor', 'patient', 'record'],
      order: { createdAt: 'DESC' },
    });
  }

  private async ensureAccessToRecord(record: MedicalRecord, requesterId: string) {
    if (record.patient.id === requesterId) return;

    const hasNote = await this.notesRepo.exist({
      where: { record: { id: record.id }, doctor: { id: requesterId } },
    });

    if (!hasNote) {
      throw new ForbiddenException('Insufficient role');
    }
  }

  private async getOrCreateRecord(patientId: string) {
    let record = await this.recordsRepo.findOne({
      where: { patient: { id: patientId } },
      relations: ['patient'],
    });

    if (!record) {
      const patientRef = { id: patientId } as User;
      record = this.recordsRepo.create({ patient: patientRef });
      record = await this.recordsRepo.save(record);
    }

    return record;
  }
}
