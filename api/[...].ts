import { createServer } from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files
const staticPath = path.resolve(__dirname, "../dist");
app.use(express.static(staticPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;
