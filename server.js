const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors());
app.use(express.json());

const LUMA_API_KEY = "luma-6bff8e42-c1f2-4e9d-980a-8eb2d1c074c6-c5480524-af57-49e8-bb88-e2837b5aa8fa";

// ✅ POST 요청을 받을 경로 '/luma'
app.post("/luma", async (req, res) => {
  try {
    const response = await fetch("https://api.luma.ai/v1/image-to-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + LUMA_API_KEY
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Proxy server running on port 3000");
});
