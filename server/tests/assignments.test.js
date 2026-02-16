const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { createAssignment, submitAssignment } = require('../controllers/assignmentController');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

// Mock Auth Middleware
const mockProtect = (req, res, next) => {
    req.user = { _id: new mongoose.Types.ObjectId() }; // Mock User ID
    next();
};

const app = express();
app.use(express.json());
app.post('/api/assignments', mockProtect, createAssignment);
app.post('/api/assignments/:id/submit', mockProtect, submitAssignment);

// Mock Mongoose Models
jest.mock('../models/Assignment');
jest.mock('../models/Submission');

describe('Assignment Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a quiz successfully', async () => {
        const mockAssignment = {
            _id: new mongoose.Types.ObjectId(),
            title: 'Test Quiz',
            type: 'quiz',
            questions: [{ questionText: 'Q1', options: [], marks: 5 }]
        };

        Assignment.create.mockResolvedValue(mockAssignment);

        const res = await request(app)
            .post('/api/assignments')
            .send({
                title: 'Test Quiz',
                description: 'Desc',
                course: new mongoose.Types.ObjectId(),
                dueDate: new Date(),
                type: 'quiz',
                questions: [{ questionText: 'Q1', options: [], marks: 5 }]
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.type).toEqual('quiz');
        expect(Assignment.create).toHaveBeenCalled();
    });

    it('should auto-grade a quiz correctly', async () => {
        const questionId = new mongoose.Types.ObjectId();
        const optionIdCorrect = new mongoose.Types.ObjectId();
        const optionIdWrong = new mongoose.Types.ObjectId();

        const mockAssignment = {
            _id: new mongoose.Types.ObjectId(),
            type: 'quiz',
            maxGrade: 10,
            questions: [{
                _id: questionId,
                marks: 10,
                options: [
                    { _id: optionIdCorrect, text: 'Correct', isCorrect: true },
                    { _id: optionIdWrong, text: 'Wrong', isCorrect: false }
                ]
            }]
        };

        Assignment.findById.mockResolvedValue(mockAssignment);
        Submission.findOne.mockResolvedValue(null);
        Submission.create.mockImplementation((data) => ({ ...data, _id: 'sub123' }));

        // Test Correct Answer
        const res = await request(app)
            .post(`/api/assignments/${mockAssignment._id}/submit`)
            .send({
                quizAnswers: [{
                    questionId: questionId,
                    selectedOptionId: optionIdCorrect
                }]
            });

        expect(res.statusCode).toEqual(201);
        expect(Submission.create).toHaveBeenCalledWith(expect.objectContaining({
            score: 10,
            grade: '10/10'
        }));
    });
});
