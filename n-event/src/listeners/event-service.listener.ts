import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as fs from 'fs';

@Injectable()
export class EventServiceListener {
  @OnEvent('log')
  handleLogEvent(msg: { msg: string } = { msg: '' }) {
    // console.log(`${new Date()} : ${msg.msg}`);
    fs.appendFile(
      'access.log',
      `${JSON.stringify({ dt: new Date(), msg })}\n`,
      (err) => {
        return;
      },
    );
  }
}
