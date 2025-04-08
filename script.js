async function predict() {
    // Get input values
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const exerciseHabits = document.getElementById("exerciseHabits").value;
    const stressLevel = document.getElementById("stressLevel").value;
    const smokingHabits = document.getElementById("smokingHabits").value;
    const alcoholConsumption = document.getElementById("alcoholConsumption").value;
    const diabetesStatus = document.getElementById("diabetesStatus").checked;

    // Convert categorical values to numerical equivalents that the model expects
    const genderNum = (gender === 'male') ? 1 : 0;
    const exerciseHabitsNum = (exerciseHabits === 'Do') ? 1 : 0;  // 1 for "Do", 0 for "Don't"
    const smokingHabitsNum = (smokingHabits === 'Do') ? 1 : 0;  // 1 for "Do", 0 for "Don't"
    const alcoholConsumptionNum = (alcoholConsumption === 'Do') ? 1 : 0;  // 1 for "Do", 0 for "Don't"
    const diabetesStatusNum = diabetesStatus ? 1 : 0;  // 1 for true, 0 for false
    const stressLevelNum = (stressLevel === 'High') ? 1 : 0;  // Assuming stress level is a binary indicator (1 for "High", 0 for "Low")

    // Prepare the data in the format the model expects (an array)
    const inputData = [
        age,
        genderNum,
        exerciseHabitsNum,
        stressLevelNum,
        smokingHabitsNum,
        alcoholConsumptionNum,
        diabetesStatusNum
    ];

    // Send the data to your prediction API
    const response = await fetch('http://localhost:3001/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            age: inputData[0],
            gender: inputData[1],
            exerciseHabits: inputData[2],
            stressLevel: inputData[3],
            smokingHabits: inputData[4],
            alcoholConsumption: inputData[5],
            diabetesStatus: inputData[6],
        }),
    });

    // Get the prediction result
    const result = await response.json();

    // Show the result
    const resultElement = document.getElementById("result");
    if (result.prediction === 1) {
        resultElement.innerHTML = "High risk of heart disease!";
    } else {
        resultElement.innerHTML = "Low risk of heart disease!";
    }
}
