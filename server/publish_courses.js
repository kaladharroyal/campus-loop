const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms')
    .then(async () => {
        console.log('MongoDB Connected');

        try {
            const result = await Course.updateMany({}, { status: 'published' });
            console.log(`Updated ${result.modifiedCount} courses to 'published'.`);

            const courses = await Course.find({});
            console.log(`Total courses: ${courses.length}`);
            courses.forEach(c => console.log(`- ${c.title} [${c.status}]`));

        } catch (err) {
            console.log(err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.log(err));
