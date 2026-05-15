import dotenv from 'dotenv';

// Load .env from the server/ root (safe to call multiple times)
dotenv.config();

function optional(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

export const env = {
  NODE_ENV: (process.env.NODE_ENV ?? 'development') as 'development' | 'production' | 'test',
  PORT:     parseInt(optional('PORT', '4000'), 10),

  // Database
  DATABASE_URL: optional('DATABASE_URL'),

  // CORS — comma-separated origins in env, split into an array
  FRONTEND_ORIGINS: optional('FRONTEND_ORIGINS', 'http://localhost:5173')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean),

  // Resend
  RESEND_API_KEY:    optional('RESEND_API_KEY'),
  RESEND_FROM_EMAIL: optional('RESEND_FROM_EMAIL', 'noreply@niyantran.in'),
  RESEND_FROM_NAME:  optional('RESEND_FROM_NAME', 'Niyantran Instruments'),

  // Admin
  ADMIN_SECRET: optional('ADMIN_SECRET'),

  get isDev()  { return this.NODE_ENV === 'development'; },
  get isProd() { return this.NODE_ENV === 'production'; },
};
