import * as onnx from 'onnxruntime-node';

// Define a constant for the model input name
const MODEL_INPUT_NAME = 'float_input';

// Global variable to store the model session
let modelSession: onnx.InferenceSession | null = null;

// Function to load the model once
export async function loadModel() {
  if (!modelSession) {
    try {
      modelSession = await onnx.InferenceSession.create('/Users/eugene/HeartDiseaseApp/models/heartDiseaseModel.onnx');
      console.log("Model loaded successfully.");
    } catch (error) {
      console.error("Error loading model:", error);
      throw new Error("Failed to load the ONNX model.");
    }
  }
}

// Function to validate inputs
function validateInputs(inputs: number[]): void {
  if (inputs.length !== 7) {
    throw new Error("Invalid number of inputs. Expected 7 features.");
  }
  // Additional validations can be added here
}

export async function predict(
  age: number,
  gender: number,
  exerciseHabits: number,
  smokingHabits: number,
  alcoholConsumption: number,
  diabetesStatus: number,
  stressLevel: number
) {
  await loadModel();
  
  if (!modelSession) {
    throw new Error('Model session is not initialized');
  }
  
  const inputData = [age, gender, exerciseHabits, smokingHabits, alcoholConsumption, diabetesStatus, stressLevel];
  console.log("Input data:", inputData);
  
  // Validate the input data
  validateInputs(inputData);
  
  // Create a Float32Array from the input data
  const floatData = new Float32Array(inputData);
  
  // Create input tensor. The input dimensions are [batch_size, number of features] = [1, 7]
  const feeds: { [key: string]: onnx.Tensor } = {};
  feeds[MODEL_INPUT_NAME] = new onnx.Tensor('float32', floatData, [1, 7]);
  
  console.log("Model input names:", modelSession.inputNames);
  
  try {
    const result = await modelSession.run(feeds);
    console.log("Model output:", result);
    
    // Extract output data safely
    const outputNames = modelSession.outputNames;
    console.log("Output names:", outputNames);
    
    let label = 0;
    let probabilities: number[] = [];
    
    // If your model outputs a label called 'label'
    if (outputNames.includes('label')) {
      const labelData = result['label'].data;
      label = Number(labelData[0]);
    } else if (outputNames.length > 0) {
      // Assume first output contains prediction probabilities or direct label
      const firstOutput = result[outputNames[0]].data;
      if (firstOutput.length > 1) {
        // Convert probabilities to an array
        probabilities = Array.from(firstOutput as Float32Array);
        // Determine label from maximum probability
        label = probabilities.indexOf(Math.max(...probabilities));
      } else {
        // Direct label prediction
        label = Number(firstOutput[0]);
      }
    }
    
    return {
      label: label === 1 ? 'Heart Disease Detected' : 'No Heart Disease',
      probabilities: probabilities
    };
  } catch (error) {
    console.error('Error during prediction:', error);
    throw new Error('Prediction failed');
  }
}
