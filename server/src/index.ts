import dotenv from 'dotenv';
dotenv.config(); // must run before any other import reads process.env

import { createApp }               from './app';
import { connectDB, disconnectDB } from './db';
import { env }                     from './config';

async function bootstrap() {
  await connectDB();

  const app    = createApp();
  const server = app.listen(env.PORT, () => {
    console.log(`\n  Niyantran Instruments API`);
    console.log(`  http://localhost:${env.PORT}/api/health`);
    console.log(`  env: ${env.NODE_ENV}\n`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n[server] ${signal} — shutting down gracefully`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    // Force exit after 10 s if graceful shutdown stalls
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

bootstrap().catch(err => {
  console.error('[bootstrap] Fatal error:', err);
  process.exit(1);
});
