const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const testUser = {
    name: "Debug User",
    email: `debug${Date.now()}@example.com`,
    password: "password123",
    role: "student"
};

async function run() {
    try {
        console.log("Connecting to MongoDB...", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
        console.log("MongoDB Connected");

        console.log("Creating user...");
        const user = await User.create(testUser);
        console.log("User created successfully:", user);

        console.log("Exiting...");
        process.exit(0);
    } catch (error) {
        console.error("ERROR CAUGHT IN DEBUG SCRIPT:");
        console.error(error);
        process.exit(1);
    }
}

run();
