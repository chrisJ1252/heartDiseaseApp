import express from "express";
import path from "path";
import {HeartDiseaseController} from "./controllers/heartDiseaseController";

const app = express();

// Middleware
app.use(express.json());

// Serve static files from a dedicated 'public' folder
app.use(express.static(path.join(__dirname, 'index.html')));

// Routes

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Prediction endpoint
const heartDiseaseController = new HeartDiseaseController();
app.post("/predict", heartDiseaseController.router);

// Global error-handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error encountered:", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
