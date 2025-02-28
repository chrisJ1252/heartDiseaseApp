const express = require('express')
const{ predictHeartDisease } = require('../controllers/predictionControllers')

const router = express.Router()

router.post('/', predictHeartDisease) // POST request for predictions

module.exports = router
