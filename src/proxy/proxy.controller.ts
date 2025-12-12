import { Controller, All, Req, UseGuards, Get, Post, Patch, Delete } from "@nestjs/common";
import { Request } from "express";
import { ProxyService } from "./proxy.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  // Students routes - Admin and Lecturer can view, only Admin can modify
  @Get("api/students")
  @Roles('admin', 'lecturer')
  async proxyStudentsBaseGet(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/students")
  @Roles('admin')
  async proxyStudentsBasePost(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/students/*")
  @Roles('admin', 'lecturer')
  async proxyStudentsGet(@Req() req: Request) {
    const path = req.url.replace("/api/students", "");
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Patch("api/students/*")
  @Roles('admin')
  async proxyStudentsPatch(@Req() req: Request) {
    const path = req.url.replace("/api/students", "");
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Delete("api/students/*")
  @Roles('admin')
  async proxyStudentsDelete(@Req() req: Request) {
    const path = req.url.replace("/api/students", "");
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  // Courses routes - All authenticated users can view
    const path = req.url.replace("/api/students", "");
    return this.proxyService.forwardRequest(
      "student",
      `/api/students${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  // Courses routes - All authenticated users can view
  @Get("api/courses")
  @Roles('admin', 'lecturer', 'student')
  async proxyCoursesBaseGet(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "course",
      `/api/courses${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/courses")
  @Roles('admin')
  async proxyCoursesBasePost(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "course",
      `/api/courses${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/courses/*")
  @Roles('admin', 'lecturer', 'student')
  async proxyCoursesGet(@Req() req: Request) {
    const path = req.url.replace("/api/courses", "");
    return this.proxyService.forwardRequest(
      "course",
      `/api/courses${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Patch("api/courses/*")
  @Roles('admin')
  async proxyCoursesPatch(@Req() req: Request) {
    const path = req.url.replace("/api/courses", "");
    return this.proxyService.forwardRequest(
      "course",
      `/api/courses${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Delete("api/courses/*")
  @Roles('admin')
  async proxyCoursesDelete(@Req() req: Request) {
    const path = req.url.replace("/api/courses", "");
    return this.proxyService.forwardRequest(
      "course",
      `/api/courses${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  // Enrollments routes - Students can enroll, Admin and Lecturer can view all
  @Get("api/enrollments")
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
  @Get("api/grades")
  @Roles('admin', 'lecturer')
  async proxyGradesBaseGet(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "grades",
      `/api/grades${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/grades")
  @Roles('admin', 'lecturer')
  async proxyGradesBasePost(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "grades",
      `/api/grades${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/grades/student/*/transcript")
  @Roles('admin', 'lecturer', 'student')
  async proxyGradesTranscript(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "grades",
      req.url,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/grades/student/*/gpa")
  @Roles('admin', 'lecturer', 'student')
  async proxyGradesGpa(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "grades",
      req.url,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/grades/*")
  @Roles('admin', 'lecturer')
  async proxyGradesGet(@Req() req: Request) {
    const path = req.url.replace("/api/grades", "");
    return this.proxyService.forwardRequest(
      "grades",
      `/api/grades${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Patch("api/grades/*")
  @Roles('admin', 'lecturer')
  async proxyGradesPatch(@Req() req: Request) {
    const path = req.url.replace("/api/grades", "");
    return this.proxyService.forwardRequest(
      "grades",
      `/api/grades${path}`,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/grades/*/finalize")
  @Roles('admin', 'lecturer')
  async proxyGradesFinalize(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "grades",
      req.url,
      req.method,
      req.body,
      req.headers
    );
  }

  @Delete("api/grades/*")
  @Roles('admin')
  async proxyGradesDelete(@Req() req: Request) {
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
