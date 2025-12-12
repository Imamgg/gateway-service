import { Controller, All, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ProxyService } from "./proxy.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

@Controller()
@UseGuards(JwtAuthGuard)
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @All("api/students/*")
  async proxyStudents(@Req() req: Request) {
    const path = req.url.replace("/api/students", "");
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @All("api/courses/*")
  async proxyCourses(@Req() req: Request) {
    const path = req.url.replace("/api/courses", "");
    return this.proxyService.forwardRequest(
      "course",
      `/api/courses${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @All("api/grades/*")
  async proxyGrades(@Req() req: Request) {
    const path = req.url.replace("/api/grades", "");
    return this.proxyService.forwardRequest(
      "grades",
      `/api/grades${path}`,
      req.method,
      req.body,
      req.headers
    );
  }
}
