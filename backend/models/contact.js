import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SUBMISSIONS_FILE = path.join(__dirname, '../data/submissions.json')

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(SUBMISSIONS_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Save contact submission
export async function saveContactSubmission(submission) {
  try {
    await ensureDataDirectory()
    
    // Generate unique ID
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const submissionWithId = {
      id: submissionId,
      ...submission
    }

    // Read existing submissions
    let submissions = []
    try {
      const data = await fs.readFile(SUBMISSIONS_FILE, 'utf8')
      submissions = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      submissions = []
    }

    // Add new submission
    submissions.push(submissionWithId)

    // Write back to file
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))

    console.log(`✅ Contact submission saved: ${submissionId}`)
    return submissionId

  } catch (error) {
    console.error('Error saving contact submission:', error)
    throw error
  }
}

// Get all submissions
export async function getAllSubmissions() {
  try {
    await ensureDataDirectory()
    
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [] // File doesn't exist yet
    }
    throw error
  }
}

// Get submission by ID
export async function getSubmissionById(id) {
  try {
    const submissions = await getAllSubmissions()
    return submissions.find(sub => sub.id === id)
  } catch (error) {
    console.error('Error getting submission by ID:', error)
    throw error
  }
}