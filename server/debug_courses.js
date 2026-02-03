const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms')
    .then(async () => {
        console.log('MongoDB Connected');

        try {
            const courses = await Course.find({});
            console.log(`Found ${courses.length} courses.`);

            courses.forEach(c => {
                console.log(`- Course: "${c.title}" | Status: "${c.status}" | ID: ${c._id}`);
            });

            const published = courses.filter(c => c.status === 'published');
            console.log(`\nPublished courses count: ${published.length}`);

        } catch (err) {
            console.log(err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.log(err));
