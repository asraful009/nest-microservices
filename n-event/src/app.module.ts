import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  ClientsModule,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventServiceListener } from './listeners/event-service.listener';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    EventServiceListener,
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 8877 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'MATH_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: '127.0.0.1', port: 8877 },
        });
      },
    },
  ],
})
export class AppModule {}
