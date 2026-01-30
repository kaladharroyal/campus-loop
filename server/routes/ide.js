const express = require('express');
const router = express.Router();
const axios = require('axios');

// @desc    Execute code
// @route   POST /api/execute-code
// @access  Public
router.post('/', async (req, res) => {
    const { language, version, code, stdin } = req.body;

    // Map common language names to Piston version aliases if needed
    // The frontend sends specific versions, Piston usually handles valid semver or 'latest'

    // Piston API v2 payload
    const payload = {
        language: language,
        version: version || '*',
        files: [
            {
                content: code
            }
        ],
        stdin: stdin || "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
    };

    try {
        const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload);
        res.json({ success: true, ...response.data });
    } catch (error) {
        console.error('Piston Execution Error:', error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.response ? error.response.data : null
        });
    }
});

module.exports = router;
