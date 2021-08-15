import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCalc(arr: number[] = []): number {
    return arr.reduce((accu, val) => {
      return accu + val;
    }, 0);
  }
}
