import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  getHello(arr: number[] = []): number {
    this.eventEmitter.emit('log', { msg: JSON.stringify(arr) });
    return arr.reduce((accu, val) => {
      return accu + val;
    }, 0);
  }
}
