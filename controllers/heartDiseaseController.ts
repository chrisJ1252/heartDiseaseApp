import { Router, Request, Response, NextFunction } from 'express';
import { predict } from '../services/heartDiseaseService';

export class HeartDiseaseController {
  public router = Router();

  constructor() {
    // With the arrow function approach, you can simply pass "this.predict"
    this.router.post("/predict", this.predict);
  }

  // Arrow function version so that 'this' context is handled properly
  public predict = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      age, gender, exerciseHabits, smokingHabits,
      alcoholConsumption, diabetesStatus, stressLevel
    } = req.body;
    
    try {
      const result = await predict(
        age,
        gender,
        exerciseHabits,
        smokingHabits,
        alcoholConsumption,
        diabetesStatus,
        stressLevel
      );
      res.json({ status: "success", data: result });
    } catch (error) {
      console.error('Error occurred during prediction:', error);
      res.status(500).json({ message: 'Error occurred during prediction' });
    }
  }
}
