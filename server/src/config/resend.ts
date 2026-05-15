import { Resend } from 'resend';
import { env } from './env';

// Resend client — instantiated only when an API key is present
export const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

export const FROM_ADDRESS = `${env.RESEND_FROM_NAME} <${env.RESEND_FROM_EMAIL}>`;
