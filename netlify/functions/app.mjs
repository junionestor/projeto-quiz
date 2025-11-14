import serverless from 'serverless-http';
import { app } from '../../server.mjs';

console.log(process.cwd())

export const handler = serverless(app);
