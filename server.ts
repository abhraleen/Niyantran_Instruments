import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Inquiries API
  app.post("/api/inquiries", async (req, res) => {
    const { name, organization, email, phone, service, requirement, message } = req.body;
    
    try {
      // Save to Neon PostgreSQL
      if (process.env.DATABASE_URL) {
        await pool.query(
          "INSERT INTO inquiries (name, organization, email, phone, service, requirement, message) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [name, organization, email, phone, service, requirement, message]
        );
      } else {
        console.warn("DATABASE_URL not set, skipping database save.");
      }

      res.status(200).json({ success: true, message: "Inquiry saved to database" });
    } catch (error: any) {
      console.error("Error processing inquiry:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      if (process.env.DATABASE_URL) {
        const result = await pool.query("SELECT * FROM inquiries ORDER BY created_at DESC");
        res.json(result.rows);
      } else {
        // Return dummy data if DB not connected
        res.json([
          {
            id: 1,
            name: "Dr. Arvind Kumar",
            organization: "IIT Delhi",
            email: "arvind@iitd.ac.in",
            phone: "+91 9876543210",
            service: "IV Measurement Systems",
            requirement: "Custom semiconductor characterization",
            message: "Interested in the high-precision IV system for our silicon research lab.",
            created_at: new Date().toISOString(),
          }
        ]);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Services/Products API
  app.get("/api/services", async (req, res) => {
    try {
      if (process.env.DATABASE_URL) {
        const result = await pool.query("SELECT * FROM services ORDER BY id ASC");
        res.json(result.rows);
      } else {
        res.json([
          { 
            id: "iv", 
            title: "IV Measurement Systems", 
            description: "Precision source-measure units and characterization systems for advanced semiconductors and nanomaterials.",
            details: "High-accuracy measurement for R&D.",
            icon: "activity"
          },
          { 
            id: "qe", 
            title: "Quantum Efficiency", 
            description: "Spectral response measurement systems for solar cells, photodetectors, and optoelectronic research.",
            details: "Industry-standard accuracy for photocathodes.",
            icon: "sun"
          },
          { 
            id: "evap", 
            title: "Evaporation Control", 
            description: "Intelligent process control systems for thermal and e-beam evaporation systems with high-resolution feedback.",
            details: "Thin film thickness monitoring.",
            icon: "layers"
          },
          { 
            id: "soft", 
            title: "Software Consultancy", 
            description: "Custom instrumentation software, automation drivers, and data analysis pipelines for research workflows.",
            details: "Scientific software architecture.",
            icon: "code"
          }
        ]);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Initial DB Setup
async function setupDb() {
    if (!process.env.DATABASE_URL) return;
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS inquiries (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                organization TEXT,
                email TEXT NOT NULL,
                phone TEXT,
                service TEXT,
                requirement TEXT,
                message TEXT,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS services (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                details TEXT,
                icon TEXT,
                image_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Database tables verified/created.");
    } catch (err) {
        console.error("Database setup error:", err);
    }
}

setupDb().then(() => startServer());
