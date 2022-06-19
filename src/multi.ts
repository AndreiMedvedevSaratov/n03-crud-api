import cluster from 'cluster';
import { pid } from 'process';
import { cpus } from 'os';

void (async () => {
  if (cluster.isPrimary) {
    const cpusNumber = cpus().length;

    console.log(`Master pid: ${pid}`)
    console.log(`Starting ${cpusNumber} forks`)

    for (let i = 0; i < cpusNumber; i++) {
      cluster.fork();
    }

  } else {
    const id = cluster.worker?.id;

    await import('./index');

    console.log(`Worker: ${id}, pid: ${pid}`)
  }
})()
