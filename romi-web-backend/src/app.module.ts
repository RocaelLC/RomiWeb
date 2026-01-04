import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { CallModule } from './call/call.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RealtimeModule } from './realtime/realtime.module';
import { CronModule } from './cron/cron.module';
import { ClinicalNotesModule } from './clinical-notes/clinical-notes.module';
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      
      // Enable SSL only when explicitly requested
      ssl:
        (process.env.DB_SSL ?? 'false').toLowerCase() === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
      extra:
        (process.env.DB_SSL ?? 'false').toLowerCase() === 'true'
          ? { sslmode: 'require' }
          : undefined,
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    AppointmentsModule,
    CallModule,
    ChatModule,
    NotificationsModule,
    RealtimeModule,
    CronModule,
    ClinicalNotesModule,
     HealthModule,
  ],
})
export class AppModule {}
