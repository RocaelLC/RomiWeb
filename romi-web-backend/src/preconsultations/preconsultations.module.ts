import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Preconsultation } from "./preconsultation.entity";
import { Appointment } from "../appointments/appointment.entity";
import { PreconsultationsService } from "./preconsultations.service";
import { PreconsultationsController } from "./preconsultations.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Preconsultation, Appointment])],
  providers: [PreconsultationsService],
  controllers: [PreconsultationsController],
})
export class PreconsultationsModule {}
