const express = require('express');
const admin = require('firebase-admin');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Initialize Firebase Admin SDK
googleApplicationCredential = process.env.GOOGLE_APPLICATION_CREDENTIALS;
admin.initializeApp({ credential: admin.credential.applicationDefault() });

// OpenAI API Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route for Firebase Authentication
app.post('/api/auth/login', async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Route for OpenAI API
app.post('/api/openai/chat', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});