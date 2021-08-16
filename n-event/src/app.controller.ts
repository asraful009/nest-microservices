import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(@Query() query: { limit: string }): Promise<number> {
    const limit = parseInt(query.limit, 10);
    const promices: any[] = [];

    promices.push((limit): Promise<number[]> => {
      return new Promise((resolve, reject) => {
        this.client
          .send<number[], number>({ cmd: 'gen' }, limit)
          .subscribe((arr) => {
            resolve(arr);
          });
      });
    });
    promices.push((arr: number[]): Promise<number> => {
      return new Promise((resolve, reject) => {
        this.client
          .send<number, number[]>({ cmd: 'calc' }, arr)
          .subscribe((res) => {
            resolve(res);
          });
      });
    });
    return promices.reduce((functionChain, nextFunction) => {
      return functionChain.then((previousResult) =>
        nextFunction(previousResult),
      );
    }, Promise.resolve(limit));
  }
}
