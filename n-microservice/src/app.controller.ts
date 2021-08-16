import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log(`load appController`);
  }

  @MessagePattern({ cmd: 'calc' })
  accumulate(data: number[]): number {
    // console.log(data);
    return this.appService.getCalc(data);
  }
  @MessagePattern({ cmd: 'gen' })
  genarate(limit: number): number[] {
    // console.log(limit);
    const arr: number[] = [];
    for (let i = 0; i < limit; i++) {
      arr.push(Math.random());
    }
    return arr;
  }
}
