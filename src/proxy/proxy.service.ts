import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ProxyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  private getServiceUrl(service: string): string {
    const urls = {
      student: this.configService.get("STUDENT_SERVICE_URL"),
      course: this.configService.get("COURSE_SERVICE_URL"),
      grades: this.configService.get("GRADES_SERVICE_URL"),
    };
    return urls[service];
  }

  async forwardRequest(
    service: string,
    path: string,
    method: string,
    body?: any,
    headers?: any
  ) {
    const serviceUrl = this.getServiceUrl(service);
    const url = `${serviceUrl}${path}`;

    console.log(`Forwarding ${method} ${url}`);

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          url,
          method,
          data: body,
          headers: {
            ...headers,
            host: undefined, // Remove host header to prevent conflicts
            "if-none-match": undefined, // Remove ETag caching headers
            "if-modified-since": undefined,
          },
          validateStatus: (status) => status >= 200 && status < 500, // Accept 2xx, 3xx, 4xx
        })
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error forwarding to ${url}:`,
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }
}
