import {
  Controller,
  All,
  Req,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
} from "@nestjs/common";
import { Request } from "express";
import { ProxyService } from "./proxy.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  // ---------- Helper ----------
  private buildForwardPath(req: Request, prefix: string) {
    // req.originalUrl preserves path + query (Express)
    // remove the prefix (e.g. /api/students) and return the remainder (may be "" or "/:id?query")
    const original = req.originalUrl || req.url;
    if (!original.startsWith(prefix)) return original;
    const remainder = original.slice(prefix.length); // keeps leading '/' if present
    // If remainder is empty, return prefix base (so microservice sees /api/students or /api/courses)
    return prefix + (remainder || "");
  }

  // ---------- STUDENTS ----------
  @Get("api/students")
  @Roles("admin", "lecturer")
  async proxyStudentsBaseGet(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/students");
    return this.proxyService.forwardRequest(
      "student",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/students")
  @Roles("admin")
  async proxyStudentsBasePost(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/students");
    return this.proxyService.forwardRequest(
      "student",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/students/*")
  @Roles("admin", "lecturer")
  async proxyStudentsGet(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/students");
    return this.proxyService.forwardRequest(
      "student",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Patch("api/students/*")
  @Roles("admin")
  async proxyStudentsPatch(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/students");
    return this.proxyService.forwardRequest(
      "student",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Delete("api/students/*")
  @Roles("admin")
  async proxyStudentsDelete(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/students");
    return this.proxyService.forwardRequest(
      "student",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  // ---------- COURSES ----------
  @Get("api/courses")
  @Roles("admin", "lecturer", "student")
  async proxyCoursesBaseGet(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/courses");
    return this.proxyService.forwardRequest(
      "course",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/courses")
  @Roles("admin")
  async proxyCoursesBasePost(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/courses");
    return this.proxyService.forwardRequest(
      "course",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/courses/*")
  @Roles("admin", "lecturer", "student")
  async proxyCoursesGet(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/courses");
    return this.proxyService.forwardRequest(
      "course",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Patch("api/courses/*")
  @Roles("admin")
  async proxyCoursesPatch(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/courses");
    return this.proxyService.forwardRequest(
      "course",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Delete("api/courses/*")
  @Roles("admin")
  async proxyCoursesDelete(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/courses");
    return this.proxyService.forwardRequest(
      "course",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  // ---------- ENROLLMENTS ----------
  @Get("api/enrollments")
  @Roles("admin", "lecturer", "student")
  async proxyEnrollmentsBase(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/enrollments");
    return this.proxyService.forwardRequest(
      "course",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @All("api/enrollments/*")
  @Roles("admin", "lecturer", "student")
  async proxyEnrollments(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/enrollments");
    return this.proxyService.forwardRequest(
      "course",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  // ---------- GRADES ----------
  @Get("api/grades")
  @Roles("admin", "lecturer")
  async proxyGradesBaseGet(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/grades");
    return this.proxyService.forwardRequest(
      "grades",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/grades")
  @Roles("admin", "lecturer")
  async proxyGradesBasePost(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/grades");
    return this.proxyService.forwardRequest(
      "grades",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/grades/student/*/transcript")
  @Roles("admin", "lecturer", "student")
  async proxyGradesTranscript(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/grades");
    return this.proxyService.forwardRequest(
      "grades",
      req.originalUrl,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/grades/student/*/gpa")
  @Roles("admin", "lecturer", "student")
  async proxyGradesGpa(@Req() req: Request) {
    return this.proxyService.forwardRequest(
      "grades",
      req.originalUrl,
      req.method,
      req.body,
      req.headers
    );
  }

  @Get("api/grades/*")
  @Roles("admin", "lecturer")
  async proxyGradesGet(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/grades");
    return this.proxyService.forwardRequest(
      "grades",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Patch("api/grades/*")
  @Roles("admin", "lecturer")
  async proxyGradesPatch(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/grades");
    return this.proxyService.forwardRequest(
      "grades",
      path,
      req.method,
      req.body,
      req.headers
    );
  }

  @Post("api/grades/*/finalize")
  @Roles("admin", "lecturer")
  async proxyGradesFinalize(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/grades");
    return this.proxyService.forwardRequest(
      "grades",
      req.originalUrl,
      req.method,
      req.body,
      req.headers
    );
  }

  @Delete("api/grades/*")
  @Roles("admin")
  async proxyGradesDelete(@Req() req: Request) {
    const path = this.buildForwardPath(req, "/api/grades");
    return this.proxyService.forwardRequest(
      "grades",
      path,
      req.method,
      req.body,
      req.headers
    );
  }
}
