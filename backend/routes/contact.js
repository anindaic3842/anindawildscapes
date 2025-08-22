import express from 'express'
import { body, validationResult } from 'express-validator'
import { sendContactEmail } from '../utils/emailService.js'
import { saveContactSubmission, getAllSubmissions } from '../models/contact.js'

const router = express.Router()

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
]

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, email, message } = req.body

    // Save submission to file (in production, you'd use a database)
    const submissionId = await saveContactSubmission({
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress
    })

    // Send email notification (optional)
    try {
      await sendContactEmail({ name, email, message, submissionId })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      submissionId
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your request. Please try again.'
    })
  }
})

// GET /api/contact/submissions - Get all submissions (admin only)
router.get('/submissions', async (req, res) => {
  try {
    // In a real app, you'd add authentication here
    const submissions = await getAllSubmissions()
    res.json({
      success: true,
      submissions
    })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions'
    })
  }
})

export default router