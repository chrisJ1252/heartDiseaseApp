import express from "express";
import path from "path";
import predictHeartDiseaseController from "./controllers/heartDiseaseController";

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});
app.post("/predict", predictHeartDiseaseController);

export default app;
