import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
  @Get("health")
  health() {
    return {
      ok: true,
      service: "romi-backend",
      ts: new Date().toISOString(),
    };
  }
}
