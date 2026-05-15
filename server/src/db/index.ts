import { Pool, type PoolConfig } from 'pg';
import { env } from '../config/env';

const poolConfig: PoolConfig = {
  connectionString: env.DATABASE_URL || undefined,
  ssl: env.isProd ? { rejectUnauthorized: false } : false,
  max:                    10,
  idleTimeoutMillis:  30_000,
  connectionTimeoutMillis: 5_000,
};

export const pool = new Pool(poolConfig);

// Verify connectivity on startup — non-fatal in development
export async function connectDB(): Promise<void> {
  if (!env.DATABASE_URL) {
    console.warn('[db] DATABASE_URL not set — skipping connection check');
    return;
  }

  try {
    const client = await pool.connect();
    const { rows } = await client.query<{ now: string }>('SELECT NOW() AS now');
    client.release();
    console.log(`[db] Connected to Neon PostgreSQL — server time: ${rows[0].now}`);
  } catch (err) {
    console.error('[db] Connection failed:', err);
    if (env.isProd) process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await pool.end();
  console.log('[db] Pool closed');
}
