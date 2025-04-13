const request = require("supertest")
const express = require("express")
const {HeartDiseaseController} = require("./heartDiseaseController")
const {loadModel} = require("../services/heartDiseaseService")

describe("heartDiseaseController", () =>{
    let app
    let heartDiseaseControllerMock

    beforeAll(async () =>{
        await loadModel()
    })
    heartDiseaseControllerMock = {
        predict: jest.fn(),
    }

    app = express()
    app.use(express.json())
    const contoller = new HeartDiseaseController(heartDiseaseControllerMock)
    app.use(contoller.router)

    it("should return a 200 for a succesful prediction ", async () =>{
        const mockInput = {age: 20, gender: 1, exerciseHabits: 0, smokingHabits: 1, alcoholConsumption: 1, diabetesStatus: 1, stressLevel: 1}
        const mockPrediction = {risk: "High risk of heart disease!"}

        heartDiseaseControllerMock.predict.mockResolvedValue(mockPrediction)

        const response = await request(app).post("/predict").send(mockInput)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            status: "success",
            data: mockPrediction
        })
    })
})