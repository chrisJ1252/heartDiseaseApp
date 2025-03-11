const ort = require('onnxruntime-node');
const path = require('path');

const modelPath = path.join(__dirname, '../models/heartDiseaseModel.onnx');

// Load the ONNX model once
let session: any;
async function loadModel() {
    if (!session) {
        session = await ort.InferenceSession.create(modelPath);
    }
    return session;
}

export const predictHeartDisease = async (age: number, gender: string, exerciseHabits: string, smokingHabits: string, alcoholConsumption: string, stressLevel: string, diabetesStatus: boolean) => {
    console.log("Prediction function started");  // Check if function is entered

    const session = await loadModel();
    console.log("Model loaded");  // Check if model is loaded

    // Convert input values to numeric format
    const inputTensor = {
        float_input: new ort.Tensor('float32', new Float32Array([
            Number(age),
            gender === 'male' ? 1 : 0,
            exerciseHabits === 'regular' ? 1 : 0,
            smokingHabits ? 1 : 0,  // Ensure this is a valid boolean or number
            alcoholConsumption === 'high' ? 1 : 0,
            diabetesStatus ? 1 : 0,
            stressLevel === 'high' ? 1: 0
        ]), [1,7])
    };

    console.log("Input tensor prepared", inputTensor);  // Check if tensor is created correctly

    try {
        const results = await session.run(inputTensor);
        console.log("Inference results:", results);
        
        // Log all the tensor names and their data
        Object.keys(results).forEach((key) => {
            console.log(`Tensor name: ${key}, data:`, results[key].data);
        });
    
        // Assuming the output tensor is named 'out' (but log tensor names to verify)
        const prediction = results.out?.data[0] > 0.5 ? 'High Risk' : 'Low Risk';
        console.log("Prediction:", prediction);
        return prediction;
    } catch (error) {
        console.error("Error during inference:", error);
        throw error;
    }
    

};