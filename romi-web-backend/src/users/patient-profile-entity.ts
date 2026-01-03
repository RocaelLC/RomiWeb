import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('patient_profile')
export class PatientProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'jsonb', nullable: true })
  demographics?: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  emergency_contact?: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  risk_flags?: Record<string, any> | null;
}
