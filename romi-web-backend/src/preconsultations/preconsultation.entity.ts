import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Appointment } from "../appointments/appointment.entity";
import { User } from "../users/user.entity";

@Entity("preconsultations")
@Unique(["appointment"])
export class Preconsultation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // 1 pre-consulta por cita
  @OneToOne(() => Appointment, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  appointment: Appointment;

  // Paciente dueño de la pre-consulta
  @ManyToOne(() => User, { nullable: false })
  patient: User;

  @Column({ type: "text", nullable: true })
  chiefComplaint?: string;

  @Column({ type: "jsonb", nullable: true })
  symptoms?: string[];

  @Column({ type: "text", nullable: true })
  onset?: string;

  @Column({ type: "text", nullable: true })
  meds?: string;

  @Column({ type: "text", nullable: true })
  history?: string;

  // Por ahora solo metadata
  @Column({ type: "jsonb", nullable: true })
  files?: { name: string; url?: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
