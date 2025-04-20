// routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const { createComplaint, getComplaints, getComplaintById, updateComplaint, deleteComplaint } = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authmiddleware');

// Create a complaint (requires authentication)
router.post('/', authMiddleware, createComplaint);

// Get all complaints (no authentication required)
router.get('/', getComplaints);

// Get a specific complaint by ID (no authentication required)
router.get('/:id', getComplaintById);

// Update a complaint by ID (requires authentication)
router.put('/:id', authMiddleware, updateComplaint);

// Delete a complaint by ID (requires authentication)
router.delete('/:id', authMiddleware, deleteComplaint);

module.exports = router;
