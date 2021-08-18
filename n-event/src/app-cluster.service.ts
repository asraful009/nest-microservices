import { Injectable } from '@nestjs/common';
// import * as cluster from 'node';
import cluster = require('cluster');
import * as os from 'os';

@Injectable()
export class AppClusterService {
  static Clusterize(callback: any): void {
    console.log(Number.EPSILON);

    // console.log(cluster);
    if (cluster['isMaster']) {
      const numCPUs = os.cpus().length;
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster['fork']();
      }
      cluster['on']('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died.`);
        // cluster.fork();
      });
    } else {
      console.log(`Cluster server Slave started on ${process.pid}`);
      callback();
    }
  }
}
