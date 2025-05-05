// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const upload = multer();
app.use(cors());
app.use(express.json());

const LUMA_API_KEY = process.env.LUMA_API_KEY;

app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('image', req.file.buffer, req.file.originalname);

    const response = await fetch('https://api.luma.ai/v1/images', {
      method: 'POST',
      headers: { Authorization: `Bearer ${LUMA_API_KEY}` },
      body: formData,
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

app.post('/create-video', async (req, res) => {
  try {
    const response = await fetch('https://api.luma.ai/v1/videos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LUMA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: req.body.imageId,
        prompt: 'gimbal and drone operated video',
        quality: 'medium',
        ratio: 'original',
        duration: 5,
      }),
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Video creation failed' });
  }
});

app.get('/check-status/:videoId', async (req, res) => {
  try {
    const response = await fetch(`https://api.luma.ai/v1/videos/${req.params.videoId}`, {
      headers: { Authorization: `Bearer ${LUMA_API_KEY}` },
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Status check failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
