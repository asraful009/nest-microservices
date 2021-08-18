import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppClusterService } from './app-cluster.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const microserviceOption = {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 8877 },
  };
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOption,
  );
  await app.listen();
  console.log(`🏁 Micro Service is listen on 8877 port`);
}
// bootstrap();

async function bootstrapRabbitMQ() {
  const microserviceRabbitOption = {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  };
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceRabbitOption,
  );
  await app.listen();
  console.log(`🚀 Micro Service with rebbitMQ`);
}
// bootstrapRabbitMQ();

AppClusterService.Clusterize(bootstrapRabbitMQ);
