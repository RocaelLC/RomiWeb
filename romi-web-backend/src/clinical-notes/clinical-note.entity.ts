import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { MedicalRecord } from '../medical-records/medical-record.entity';
import { Appointment } from '../appointments/appointment.entity';
import { User } from '../users/user.entity'; // úsalo para patient y doctor


@Entity('clinical_notes')
export class ClinicalNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MedicalRecord, (r) => r.notes, { nullable: false })
  record: MedicalRecord;

  @ManyToOne(() => User, { nullable: false })
  patient: User;

  @ManyToOne(() => User, { nullable: false })
  doctor: User;

  @OneToOne(() => Appointment, { nullable: false, eager: true })
  @JoinColumn()
  appointment: Appointment;

  @Column({ type: 'text' })
  subjective: string; // motivo de consulta

  @Column({ type: 'text', nullable: true })
  objective?: string; // hallazgos

  @Column({ type: 'text', nullable: true })
  assessment?: string; // diagnóstico

  @Column({ type: 'text', nullable: true })
  plan?: string; // tratamiento / indicaciones

  @Column({ type: 'jsonb', nullable: true })
  prescriptions?: any; // array de medicamentos

  @Column({ type: 'jsonb', nullable: true })
  attachments?: any[]; // refs a archivos/URLs

  @CreateDateColumn()
  createdAt: Date;
}
