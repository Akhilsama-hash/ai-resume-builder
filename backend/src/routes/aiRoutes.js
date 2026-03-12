import express from 'express';
import { 
  enhanceContent, 
  calculateATSScore, 
  getJobMatchSuggestions,
  generateProfessionalSummary,
  improveBulletPoint,
  storyToResume
} from '../controllers/aiController.js';

const router = express.Router();

// AI Content Enhancement
router.post('/enhance-content', enhanceContent);

// ATS Score Calculator
router.post('/calculate-ats-score', calculateATSScore);

// Job Match Suggestions
router.post('/job-match', getJobMatchSuggestions);

// Generate Professional Summary
router.post('/generate-summary', generateProfessionalSummary);

// Improve Bullet Points
router.post('/improve-bullet', improveBulletPoint);

// Story to Resume Converter
router.post('/story-to-resume', storyToResume);

export default router;
