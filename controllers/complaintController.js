// controllers/complaintController.js
const mongoose = require('mongoose');
const Complaint = require('../models/complaint');
const User = require('../models/User');

// Create a complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: 'Title, description, and image are required' });
    }

    const newComplaint = new Complaint({
      title,
      description,
      image, // Store raw base64 string
      student: req.user?.id, // Optional: set user ID if available
    });

    await newComplaint.save();
    res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('student', 'email role'); // Populating student info
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('student', 'email role');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a complaint by ID (Add message to chat)
exports.updateComplaint = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Complaint ID format' });
  }

  const { message, user } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ message: 'Message cannot be empty' });
  }

  try {
    // Add the new message to the chat array of the complaint
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { $push: { chat: { message, user, date: new Date() } } }, // Push new chat message
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint updated successfully', complaint: updatedComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a complaint by ID
exports.deleteComplaint = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Complaint ID format' });
  }

  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
