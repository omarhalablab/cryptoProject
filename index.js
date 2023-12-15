const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(" file ", file , req)
    // Handle file upload
    const file = req.file;
   
    // Perform encryption using AES
    const cipher = crypto.createCipher('aes-256-cbc', 'your-secret-key');
    let encryptedBuffer = Buffer.concat([cipher.update(file.buffer), cipher.final()]);

    // Generate a random symmetric key
    const symmetricKey = crypto.randomBytes(32);

    // Encrypt the symmetric key using RSA
    const publicKey = fs.readFileSync('path/to/public-key.pem', 'utf-8');
    const encryptedKey = crypto.publicEncrypt(publicKey, symmetricKey);

    // Save metadata to the database (not implemented here)

    res.json({ success: true });
});

app.get('/download/:fileId', (req, res) => {
    // Fetch metadata from the database using fileId (not implemented here)

    // Decrypt symmetric key using RSA
    const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf-8');
    const decryptedKey = crypto.privateDecrypt(privateKey, encryptedKey);

    // Decrypt file contents using AES
    const decipher = crypto.createDecipher('aes-256-cbc', decryptedKey);
    let decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

    // Send the decrypted file to the client
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'decrypted-file.txt');
    res.send(decryptedBuffer);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});