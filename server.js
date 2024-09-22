const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();
const upload = multer();
const atob = require('atob'); // For base64 decoding

app.use(cors());
app.use(bodyParser.json());

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data = [], file_b64 } = req.body;

    // Numbers and alphabets filtering
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(char => char.match(/[a-z]/));
    const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.reduce((a, b) => a > b ? a : b)] : [];

    // File validation from Base64
    const fileValid = file_b64 ? true : false;
    const fileBuffer = fileValid ? Buffer.from(file_b64, 'base64') : null;
    const fileMimeType = fileValid ? 'application/octet-stream' : null;  // Default MIME type
    const fileSizeKb = fileValid && fileBuffer ? (fileBuffer.length / 1024).toFixed(2) : null;

    res.json({
        is_success: true,
        user_id: userId,
        email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Use PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
