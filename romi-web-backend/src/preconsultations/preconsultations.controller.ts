import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PreconsultationsService } from "./preconsultations.service";

@Controller("preconsultations")
@UseGuards(JwtAuthGuard)
export class PreconsultationsController {
  constructor(private readonly service: PreconsultationsService) {}

  @Post()
  upsert(@Req() req: any, @Body() dto: any) {
    return this.service.upsertForPatient(req.user.sub, dto);
  }

  @Get("appointment/:id")
  byAppointment(@Param("id") id: string) {
    return this.service.findByAppointment(id);
  }
}
