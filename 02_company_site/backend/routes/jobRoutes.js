// const express = require('express');
// const { body } = require('express-validator');
// const { getJobs, createJob, seedJobs } = require('../controllers/jobController');

// const router = express.Router();

// const jobValidation = [
//   body('title').trim().notEmpty().withMessage('Job title is required'),
//   body('department').notEmpty().withMessage('Department is required'),
//   body('description').trim().notEmpty().withMessage('Description is required'),
// ];

// router.get('/',           getJobs);
// router.post('/',          jobValidation, createJob);
// router.post('/seed',      seedJobs); // dev-only seed route

// module.exports = router;
