import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
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
  console.log(`Micro Service is listen on 8877 port`);
}
bootstrap();
