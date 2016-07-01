import { createServer } from 'primus';
import { onConnection } from './spark.js';

const serverOptions = {
  port: 8080,
  transformer: 'websockets'
};

// const clientLibLocation = `${ process.cwd() }/_dist/primus.client.js`;

const primus = createServer(onConnection, serverOptions);
