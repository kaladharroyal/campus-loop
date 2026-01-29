const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/execute-code', require('./routes/ide'));

app.get('/', (req, res) => {
  res.send('LMS API Running');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
