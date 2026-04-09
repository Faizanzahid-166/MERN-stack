const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => e.msg),
      });
    }

    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We\'ll get back to you shortly!',
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions (admin use)
// @route   GET /api/contact
// @access  Private (admin)
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getContacts };
