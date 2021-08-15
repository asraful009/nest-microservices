import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'calc' })
  accumulate(data: number[]): number {
    console.log(data);
    return this.appService.getCalc(data);
  }
}
