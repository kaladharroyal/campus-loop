const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');


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

// Helper function to get file extension (define before use)
function getFileExtension(language) {
  const extensions = {
    python: 'py',
    javascript: 'js',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    go: 'go',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    typescript: 'ts',
  };
  return extensions[language] || 'txt';
}

// Code Execution API Endpoint (BEFORE other routes to ensure it always registers)
app.post('/api/execute-code', async (req, res) => {
  try {
    const { language, version, code, stdin } = req.body;

    console.log('Executing code for language:', language);

    // Use Piston API for code execution (free and secure)
    const pistonResponse = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: language,
      version: version,
      files: [
        {
          name: `main.${getFileExtension(language)}`,
          content: code,
        },
      ],
      stdin: stdin || '',
    });

    console.log('Piston response:', pistonResponse.data);
    res.json({ success: true, run: pistonResponse.data.run });
  } catch (error) {
    console.error('Code execution error:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
      res.status(500).json({
        success: false,
        error: error.response.data.message || error.message
      });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

console.log('✅ Code execution route registered at POST /api/execute-code');


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/admin', require('./routes/admin')); // Admin routes

console.log('✅ All routes loaded');


app.get('/', (req, res) => {
  res.send('LMS API Running');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
