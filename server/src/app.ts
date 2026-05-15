import express from 'express';
import cors from 'cors';
import { corsOptions }    from './config/cors';
import { requestLogger }  from './middleware/requestLogger';
import { notFound }       from './middleware/notFound';
import { errorHandler }   from './middleware/errorHandler';
import apiRouter          from './routes';

export function createApp() {
  const app = express();

  // ─── Global middleware ──────────────────────────────────────────────────────
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '128kb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // ─── API routes ─────────────────────────────────────────────────────────────
  app.use('/api', apiRouter);

  // ─── 404 + global error handler ─────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
