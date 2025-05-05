const express = require('express');
const yts = require('yt-search');
const GIFTED_DLS = require('gifted-dls');

const app = express();
const gifted = new GIFTED_DLS();

app.get('/mp3', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Please provide a search query using ?q=' });
  }

  try {
    const data = await yts(query);
    const video = data.videos[0];
    const dlData = await gifted.ytmp3(video.url); // assumed it returns full structure

    res.json({
      creator: "Bandaheali",
      title: dlData.result.title,
      thumbnail: dlData.result.thumbnail,
      duration: dlData.result.duration,
      download_url: dlData.result.download_url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

app.get('/mp4', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Please provide a search query using ?q=" });
  }

  try {
    const data = await yts(query);
    const video = data.videos[0];
    const dlData = await gifted.ytmp4(video.url); // assumed correct method

    res.json({
      creator: "Bandaheali",
      title: dlData.result.title,
      thumbnail: dlData.result.thumbnail,
      duration: dlData.result.duration,
      download_url: dlData.result.download_url
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
