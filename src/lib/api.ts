// API configuration — uses environment variable or defaults to localhost for development

export const getApiBaseUrl = (): string => {
  // In production (Netlify), use the Render backend URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://niyantran-instruments-2701.onrender.com';
  }
  // In development, use localhost
  return 'http://localhost:4000';
};

export const apiBaseUrl = getApiBaseUrl();
