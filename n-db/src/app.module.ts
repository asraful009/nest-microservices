import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Modules from './modules/modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      schema: 'public',
      username: 'cyber009',
      password: 'cyber009',
      database: 'cyber009',
      entities: ['./**/entities/**/*.entity.js'],
      synchronize: true,
      logging: true,
      logger: 'file',
    }),
    Modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
