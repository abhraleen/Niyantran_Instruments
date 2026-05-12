# Niyantran Instruments - Research Control Systems

Precision engineering and instrumentation solutions for research laboratories.

## Local Development

To run this project on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone or download the source code.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Setup Environment Variables

Create a `.env` file in the root directory and add the following (or copy from `.env.example`):

```env
DATABASE_URL=your_postgresql_url
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

*Note: The app will work with dummy data if `DATABASE_URL` is omitted.*

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:
```bash
npm run build
```

To run the production server:
```bash
NODE_ENV=production npm run dev
```

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, PostgreSQL (Neon)
- **AI**: Google Gemini API
- **Deployment**: Google Cloud Run (via AI Studio)
