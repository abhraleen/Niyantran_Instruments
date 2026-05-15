declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    DATABASE_URL?: string;
    FRONTEND_ORIGINS?: string;
    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;
    RESEND_FROM_NAME?: string;
    ADMIN_SECRET?: string;
  }
}
