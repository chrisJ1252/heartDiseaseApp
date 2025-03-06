const ort = require('onnxruntime-node')
const path = require('path')



exports.predictHeartDisease = async (req, res) =>{
    try{
        const {age, gender ,exerciseHabits, smokingHabits, alcoholConsumption, diabetesStatus} = req.body

        // Check if fields are prvoided 
        if(!age || !gender || !exerciseHabits || smokingHabits === undefined || !alcoholConsumption || diabetesStatus === undefined){
            return res.status(400).json({error: "Missing required fields"});
            }
        // Load the ONNX model 
        async function loadModel() {
            const modelPath = path.join(__dirname, '../models/heartDiseaseModel.onnx')
            const session = await ort.InferenceSession.create(modelPath)
            return session
        }

        // function to make prediction 
        async function predictHeartDisease(age: Number, gender: String, exerciseHabits: String, smokingHabits: Boolean, alcoholConsumption: String, diabetesStatus: Boolean){
            const session = await loadModel()
            // Prepare input tensor need to convert features to numbers for input tensor 
            const inputTensor = {
                float_input: new ort.Tensor('float32', new Float32Array([
                    Number(age), 
                    gender === 'male' ? 1 : 0, 
                    exerciseHabits === 'regular' ? 1 : 0, 
                    smokingHabits ? 1 : 0, 
                    alcoholConsumption === 'high' ? 1 : 0,
                    diabetesStatus ? 1 : 0
                ]))
            }
            // Run prediction
            const results = await session.run(inputTensor)
            const prediction = results.out.data[0] > .5 ? 'High Risk': 'Low Risk'
            return prediction
        }

        
        }catch(error){
            console.error(error)
            res.status(500).json({error: 'Prediction failed'})
            
        }
    }