import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private getServiceUrl(service: string): string {
    const urls = {
      student: this.configService.get('STUDENT_SERVICE_URL'),
      course: this.configService.get('COURSE_SERVICE_URL'),
      grades: this.configService.get('GRADES_SERVICE_URL'),
    };
    return urls[service];
  }

  async forwardRequest(
    service: string,
    path: string,
    method: string,
    body?: any,
    headers?: any,
  ) {
    const url = `${this.getServiceUrl(service)}${path}`;
    
    try {
      const response = await firstValueFrom(
        this.httpService.request({
          url,
          method,
          data: body,
          headers,
        }),
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}
