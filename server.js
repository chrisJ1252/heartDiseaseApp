const express = require('express') // import express module 
const cors = require('cors')
const predictionRoutes = require('./routes/predictionRoutes')

const app = express() // create instance of express application 
const port = 3000

// Middleware 
app.use(cors())
app.use(express.json()) // for parsing Json request bodies 

// Routes
app.use('/predict', predictionRoutes)

// define a route that listens for get request on the root url '/'
app.get('/', (req, res) =>{
    res.send('Heart Disease Prediction API')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})