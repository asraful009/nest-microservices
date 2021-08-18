import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import { AppClusterService } from './app-cluster.service';
const numCPUs = os.cpus().length;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log(`n-event running on http://localhost:3000/`);
  });
}
AppClusterService.Clusterize(bootstrap);
