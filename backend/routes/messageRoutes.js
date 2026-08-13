const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');
const { getIsConnected } = require('../config/db');

const dbCheck = (res) => {
  if (!getIsConnected()) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
};

// @route GET /api/messages  (admin only)
router.get('/', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (e) {
    console.error('Get messages error:', e.message);
    res.status(500).json({ success: false, message: 'Error fetching messages' });
  }
});

// @route POST /api/messages  (public — contact form)
router.post('/', async (req, res) => {
  if (!dbCheck(res)) return;
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newMsg = new Message({ name, email, subject, message });
    const saved = await newMsg.save();
    res.status(201).json({ success: true, message: 'Message sent successfully', data: saved });
  } catch (e) {
    console.error('Create message error:', e.message);
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: e.message });
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

// @route PUT /api/messages/:id/read  (admin only)
router.put('/:id/read', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: msg });
  } catch (e) {
    console.error('Mark read error:', e.message);
    res.status(500).json({ success: false, message: 'Error updating message' });
  }
});

// @route DELETE /api/messages/:id  (admin only)
router.delete('/:id', protect, async (req, res) => {
  if (!dbCheck(res)) return;
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (e) {
    console.error('Delete message error:', e.message);
    res.status(500).json({ success: false, message: 'Error deleting message' });
  }
});

module.exports = router;
