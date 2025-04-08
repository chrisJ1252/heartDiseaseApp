import { Request, Response } from 'express';
import * as onnx from 'onnxruntime-node';

// Global variable to store the model session
let modelSession: onnx.InferenceSession | null = null;

// Function to load the model once
async function loadModel() {
  if (!modelSession) {
    modelSession = await onnx.InferenceSession.create('/Users/eugene/HeartDiseaseApp/models/heartDiseaseModel.onnx');
  }
}

export async function predict(age: string, gender: number, exerciseHabits: number, smokingHabits: number, alcoholConsumption: number, diabetesStatus: number, stressLevel: number) {
    try {
      // Map user input to numerical values
      const inputData = [
        parseInt(age, 10), // Age
        gender, // Gender: 1 for male, 0 for female
        exerciseHabits, // Exercise Habits: 1 for "Do", 0 for "Do not"
        stressLevel, // Stress Level: 1 for "Do", 0 for "Do not"
        smokingHabits, // Smoking Habits: 1 for "Do", 0 for "Do not"
        alcoholConsumption, // Alcohol Consumption: 1 for "Do", 0 for "Do not"
        diabetesStatus // Diabetes Status: 1 for "Yes", 0 for "No"
      ];
  
      // Prepare input tensor
      const tensor = new onnx.Tensor('float32', new Float32Array(inputData), [1, 7]);
  
      // Log tensor data for debugging
      console.log('Input tensor:', tensor);
  
      // Load model and run inference
      const session = await onnx.InferenceSession.create('/Users/eugene/HeartDiseaseApp/models/heartDiseaseModel.onnx'); // Ensure correct path to model
      const result = await session.run({ float_input: tensor });
  
      // Get the prediction result
      const probabilities = result.probabilities.data;
      const label = result.label.data[0]; // This should be the class label (0 or 1)
  
      // Return the result in a format ready for the client
      return {
        label: label === 1 ? 'Heart Disease Detected' : 'No Heart Disease',
        probabilities: probabilities
      };
    } catch (error) {
      console.error('Error during prediction:', error);
      throw new Error('Prediction failed');
    }
  }