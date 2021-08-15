import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(@Query() query: { limit: string }): number {
    const arr: number[] = [];
    const limit = parseInt(query.limit, 10);
    for (let i = 0; i < limit; i++) {
      arr.push(Math.random());
    }
    console.log(this.client);

    this.client.send<number, number[]>('calc', arr).subscribe((result) => {
      console.log(result);
    });
    return this.appService.getHello(arr);
  }
}
