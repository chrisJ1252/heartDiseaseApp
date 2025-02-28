exports.predictHeartDisease = (req, res) =>{
    // later add all inputs that will be handled
    // what if they dont input all fields 
    // can model make decisions based on a few fields
    const { age, cholesterol, bloodPressure} = req.body // hard coded will implement getting input later
    
    if(!age || !cholesterol || !bloodPressure ){
        return res.status(400).json({ error: 'Missing required feilds'})
    }

    // Place holder response (replace with models prediction logic)
    const prediction = Math.random() > 0.5 ? "High Risk": "Low Risk"
    res.json({ prediction })
}
