import express from "express";
import path from "path";
import predictHeartDiseaseController from "./controllers/heartDiseaseController";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.post("/predict", predictHeartDiseaseController);

export default app; // Export app for use in server.ts
