const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const Mood = require('../models/Mood');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
});

// Chat endpoint
router.post('/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const messages = [
            {
                role: 'system',
                content: "You are Uttar, a highly empathetic psychological support and mental wellness companion. Your tone is soft, reassuring, non-judgmental, and thoughtful. You act as a digital sanctuary. Never give medical diagnoses, but provide supportive, clarifying, and grounding responses."
            }
        ];

        if (history && history.length > 0) {
            history.forEach(msg => messages.push({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }));
        }

        messages.push({ role: 'user', content: message });

        const completion = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error("Groq Endpoint Error:", error);
        res.status(500).json({ error: 'Failed to communicate with AI', details: error.message });
    }
});

// Save Mood
router.post('/mood', async (req, res) => {
    try {
        const { sessionId, mood, note } = req.body;
        if (!sessionId || !mood) {
            return res.status(400).json({ error: 'SessionId and Mood are required' });
        }

        const newMood = new Mood({ sessionId, mood, note });
        await newMood.save();

        res.status(201).json({ success: true, mood: newMood });
    } catch (error) {
        console.error("Mood Save Error:", error);
        res.status(500).json({ error: 'Failed to save mood data' });
    }
});

// Get Mood History
router.get('/mood/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const history = await Mood.find({ sessionId }).sort({ createdAt: -1 }).limit(30);
        res.json(history);
    } catch (error) {
        console.error("Mood Fetch Error:", error);
        res.status(500).json({ error: 'Failed to fetch mood data' });
    }
});

module.exports = router;
