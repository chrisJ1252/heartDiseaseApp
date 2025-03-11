import { Router } from 'express';
import { predictHeartDisease} from '../services/heartDiseaseService';

const router = Router();

router.post("/predict", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Log received data
    const { age, gender, exerciseHabits, smokingHabits, alcoholConsumption, diabetesStatus, stressLevel } = req.body;
    const result = await predictHeartDisease(age, gender, exerciseHabits, smokingHabits, alcoholConsumption, diabetesStatus, stressLevel);
    res.json({ result });
  } catch (error) {
    res.status(500).json({message: 'Error occured during prediction' });
  }
});

export default router;
