// models/complaint.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Store image as base64 string
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional user reference
  status: { type: String, default: 'open' }, // Complaint status
  chat: [
    {
      message: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      date: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
