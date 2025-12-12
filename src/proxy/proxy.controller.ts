import { Controller, All, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ProxyService } from "./proxy.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller()
@UseGuards(JwtAuthGuard)
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  // Students routes
  @All("api/students")
  async proxyStudentsBase(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

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

  // Courses routes
  @All("api/courses")
  async proxyCoursesBase(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "course",
      `/api/courses${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
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

  // Enrollments routes
  @All("api/enrollments")
  async proxyEnrollmentsBase(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "course",
      `/api/enrollments${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @All("api/enrollments/*")
  async proxyEnrollments(@Req() req: Request) {
    const path = req.url.replace("/api/enrollments", "");
    return this.proxyService.forwardRequest(
      "course",
      `/api/enrollments${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  // Grades routes
  @All("api/grades")
  async proxyGradesBase(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "grades",
      `/api/grades${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
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
