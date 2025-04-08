import { Router } from 'express';
import { predict } from '../services/heartDiseaseService';

const router = Router();

// Updated route to call predict function with proper parameters
router.post("/predict", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Log received data
    
    // Destructure the incoming request body
    const { age, gender, exerciseHabits, smokingHabits, alcoholConsumption, diabetesStatus, stressLevel } = req.body;

    // Pass the destructured values to the predict function
    const result = await predict(age, gender, exerciseHabits, smokingHabits, alcoholConsumption, diabetesStatus, stressLevel);

    // Send the prediction result as a JSON response
    res.json({ result });

  } catch (error) {
    console.error('Error occurred during prediction:', error);
    res.status(500).json({ message: 'Error occurred during prediction' });
  }
});

export default router;
