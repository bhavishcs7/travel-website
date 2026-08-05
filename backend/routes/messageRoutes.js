const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');
const memoryStore = require('../utils/memoryStore');
const { getIsConnected } = require('../config/db');

// @route GET /api/messages
router.get('/', protect, async (req, res) => {
  if (getIsConnected()) {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      if (messages.length > 0) return res.json(messages);
    } catch (e) {
      // fallback
    }
  }

  res.json(memoryStore.messages);
});

// @route POST /api/messages
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (getIsConnected()) {
    try {
      const newMsg = new Message({ name, email, subject, message });
      const saved = await newMsg.save();
      return res.status(201).json({ message: 'Message sent successfully', data: saved });
    } catch (e) {
      // fallback
    }
  }

  const newMsg = {
    _id: `msg-${Date.now()}`,
    name,
    email,
    subject,
    message,
    isRead: false,
    createdAt: new Date().toISOString()
  };
  memoryStore.messages.unshift(newMsg);
  res.status(201).json({ message: 'Message sent successfully', data: newMsg });
});

// @route PUT /api/messages/:id/read
router.put('/:id/read', protect, async (req, res) => {
  const id = req.params.id;

  if (getIsConnected()) {
    try {
      const msg = await Message.findById(id);
      if (msg) {
        msg.isRead = true;
        await msg.save();
        return res.json(msg);
      }
    } catch (e) {
      // fallback
    }
  }

  const msg = memoryStore.messages.find(m => m._id === id);
  if (msg) {
    msg.isRead = true;
    return res.json(msg);
  }

  res.status(404).json({ message: 'Message not found' });
});

// @route DELETE /api/messages/:id
router.delete('/:id', protect, async (req, res) => {
  const id = req.params.id;

  if (getIsConnected()) {
    try {
      await Message.findByIdAndDelete(id);
    } catch (e) {
      // fallback
    }
  }

  memoryStore.messages = memoryStore.messages.filter(m => m._id !== id);
  res.json({ message: 'Message deleted' });
});

module.exports = router;
