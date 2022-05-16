import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll(): Promise<string> {
    return await this.appService.getAllData();
  }

  @Get()
  async get(): Promise<string> {
    return await this.appService.setData({});
  }
}
