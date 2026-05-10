const { validationResult } = require('express-validator');
const Job = require('../models/Job');

// @desc    Get all active job listings
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job listing
// @route   POST /api/jobs
// @access  Private (admin)
const createJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => e.msg),
      });
    }

    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed demo job listings (dev helper)
// @route   POST /api/jobs/seed
// @access  Private
const seedJobs = async (req, res, next) => {
  try {
    await Job.deleteMany({});
    const demoJobs = [
      {
        title: 'Full-Stack Developer',
        department: 'Engineering',
        type: 'Full-time',
        location: 'Remote / Islamabad',
        description:
          'We are looking for a talented Full-Stack Developer to join our engineering team. You will build scalable web applications using the MERN stack and collaborate closely with designers and AI engineers.',
        requirements: [
          '3+ years of experience with React.js & Node.js',
          'Proficiency in MongoDB and REST API design',
          'Experience with Tailwind CSS and responsive design',
          'Strong Git workflow and code review skills',
        ],
      },
      {
        title: 'UI/UX Designer',
        department: 'Design',
        type: 'Full-time',
        location: 'Remote',
        description:
          'Join our design team to craft intuitive and visually stunning digital experiences. You will own end-to-end product design from research and wireframing to high-fidelity prototypes.',
        requirements: [
          'Proficiency in Figma and Adobe XD',
          '2+ years of product design experience',
          'Strong portfolio showcasing web & mobile projects',
          'Understanding of accessibility standards (WCAG)',
        ],
      },
      {
        title: 'AI Automation Engineer',
        department: 'AI & Automation',
        type: 'Full-time',
        location: 'Remote',
        description:
          'Help us build cutting-edge AI automation pipelines and integrate LLM-powered solutions into client products. You will work with OpenAI APIs, LangChain, and custom ML workflows.',
        requirements: [
          'Hands-on experience with OpenAI / Anthropic APIs',
          'Python proficiency; familiarity with LangChain',
          'Experience deploying AI solutions to production',
          'Strong problem-solving and communication skills',
        ],
      },
      {
        title: 'Digital Marketing Specialist',
        department: 'Marketing',
        type: 'Full-time',
        location: 'Remote / Hybrid',
        description:
          'Drive growth for Blitz Tech Hub and our clients through data-driven digital marketing campaigns across SEO, PPC, social media, and content marketing.',
        requirements: [
          '2+ years in digital marketing',
          'Google Analytics & Google Ads certified',
          'Experience with SEO tools (SEMrush, Ahrefs)',
          'Strong copywriting and analytics skills',
        ],
      },
      {
        title: 'Chrome Extension Developer',
        department: 'Engineering',
        type: 'Contract',
        location: 'Remote',
        description:
          'Build powerful Chrome extensions for our clients. You will design and develop browser extensions that enhance productivity and integrate with web services.',
        requirements: [
          'Experience building Chrome Extensions (Manifest V3)',
          'Proficiency in vanilla JS, HTML, CSS',
          'Knowledge of browser APIs and security best practices',
          'Bonus: React-based extension experience',
        ],
      },
    ];
    const jobs = await Job.insertMany(demoJobs);
    res.json({ success: true, message: `${jobs.length} demo jobs seeded.`, data: jobs });
  } catch (error) {
    next(error);
  }
};

module.exports = { getJobs, createJob, seedJobs };
