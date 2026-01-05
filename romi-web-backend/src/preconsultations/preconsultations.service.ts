import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Preconsultation } from "./preconsultation.entity";
import { Appointment } from "../appointments/appointment.entity";
import { User } from "../users/user.entity";

type SavePreconsultationDto = {
  appointmentId: string;
  chiefComplaint?: string;
  symptoms?: string[];
  onset?: string;
  meds?: string;
  history?: string;
  files?: { name: string; url?: string }[];
};

@Injectable()
export class PreconsultationsService {
  constructor(
    @InjectRepository(Preconsultation)
    private readonly repo: Repository<Preconsultation>,
    @InjectRepository(Appointment)
    private readonly apptRepo: Repository<Appointment>
  ) {}

  async upsertForPatient(patientId: string, dto: SavePreconsultationDto) {
    const appt = await this.apptRepo.findOne({
      where: { id: dto.appointmentId },
      relations: ["patient", "doctor"],
    });
    if (!appt) throw new NotFoundException("Cita no encontrada");
    if (appt.patient?.id !== patientId)
      throw new ForbiddenException("No es tu cita");

    let row = await this.repo.findOne({
      where: { appointment: { id: appt.id } },
      relations: ["appointment", "patient"],
    });

    if (!row) {
      row = this.repo.create({
        appointment: appt,
        patient: appt.patient as User,
        chiefComplaint: dto.chiefComplaint,
        symptoms: dto.symptoms,
        onset: dto.onset,
        meds: dto.meds,
        history: dto.history,
        files: dto.files,
      });
    } else {
      // update
      row.chiefComplaint = dto.chiefComplaint ?? row.chiefComplaint;
      row.symptoms = dto.symptoms ?? row.symptoms;
      row.onset = dto.onset ?? row.onset;
      row.meds = dto.meds ?? row.meds;
      row.history = dto.history ?? row.history;
      row.files = dto.files ?? row.files;
    }

    return this.repo.save(row);
  }

  async findByAppointment(appointmentId: string) {
    // Devuelve null si no hay pre-consulta (para que el front muestre "No registrada")
    return this.repo.findOne({
      where: { appointment: { id: appointmentId } },
      relations: ["appointment", "patient"],
    });
  }
}
