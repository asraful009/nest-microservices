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
  imports: [EventEmitterModule.forRoot(), EventServiceListener],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'MATH_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'cats_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
    },
  ],
})
export class AppModule {}
