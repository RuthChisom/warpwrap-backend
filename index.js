import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/trending-casts', async (req, res) => {
  try {
    const response = await axios.get('https://api.neynar.com/v2/farcaster/feed/trending', {
      headers: {
        accept: 'application/json',
        api_key: process.env.NEYNAR_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching trending casts from Neynar:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch trending casts' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 WarpWrap backend running at http://localhost:${PORT}`);
});
