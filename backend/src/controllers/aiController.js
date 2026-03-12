import { 
  enhanceTextWithAI, 
  calculateATS, 
  getJobSkills,
  generateSummary,
  enhanceBullet,
  convertStoryToResume
} from '../services/aiService.js';

/**
 * Enhance resume content with AI
 * Improves grammar, adds action verbs, and makes content more professional
 */
export const enhanceContent = async (req, res) => {
  try {
    const { text, context } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const enhanced = await enhanceTextWithAI(text, context);
    
    res.json({
      success: true,
      original: text,
      enhanced: enhanced,
      improvements: [
        'Added strong action verbs',
        'Improved clarity and impact',
        'Enhanced professional tone'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enhance content', details: error.message });
  }
};

/**
 * Calculate ATS (Applicant Tracking System) Score
 * Analyzes resume for ATS compatibility and provides score out of 100
 */
export const calculateATSScore = async (req, res) => {
  try {
    const { resumeData } = req.body;
    
    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const atsResult = await calculateATS(resumeData);
    
    res.json({
      success: true,
      score: atsResult.score,
      grade: atsResult.grade,
      color: atsResult.color,
      breakdown: atsResult.breakdown,
      details: atsResult.details,
      feedback: atsResult.feedback,
      suggestions: atsResult.suggestions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate ATS score', details: error.message });
  }
};

/**
 * Get job-specific skill suggestions
 * AI analyzes job title and suggests relevant skills and keywords
 */
export const getJobMatchSuggestions = async (req, res) => {
  try {
    const { jobTitle, currentSkills } = req.body;
    
    if (!jobTitle) {
      return res.status(400).json({ error: 'Job title is required' });
    }

    const suggestions = await getJobSkills(jobTitle, currentSkills || []);
    
    res.json({
      success: true,
      jobTitle: jobTitle,
      suggestedSkills: suggestions.skills,
      keywords: suggestions.keywords,
      recommendations: suggestions.recommendations
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get job suggestions', details: error.message });
  }
};

/**
 * Generate professional summary
 * Creates compelling summary based on user's background
 */
export const generateProfessionalSummary = async (req, res) => {
  try {
    const { name, role, experience, skills } = req.body;
    
    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }

    const summary = await generateSummary({ name, role, experience, skills });
    
    res.json({
      success: true,
      summary: summary,
      tips: [
        'Keep it concise (3-4 lines)',
        'Highlight key achievements',
        'Include relevant skills'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate summary', details: error.message });
  }
};

/**
 * Improve bullet point
 * Enhances individual bullet points with action verbs and impact
 */
export const improveBulletPoint = async (req, res) => {
  try {
    const { bullet, role } = req.body;
    
    if (!bullet) {
      return res.status(400).json({ error: 'Bullet point text is required' });
    }

    const improved = await enhanceBullet(bullet, role);
    
    res.json({
      success: true,
      original: bullet,
      improved: improved,
      changes: [
        'Added action verb',
        'Included measurable impact',
        'Improved clarity'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to improve bullet point', details: error.message });
  }
};

/**
 * Convert story/text to structured resume
 * Extracts information from user's story and creates resume data
 */
export const storyToResume = async (req, res) => {
  try {
    const { story } = req.body;
    
    if (!story || story.trim().length < 50) {
      return res.status(400).json({ error: 'Story text is too short (minimum 50 characters)' });
    }

    const resumeData = await convertStoryToResume(story);
    
    res.json({
      success: true,
      resumeData: resumeData,
      message: 'Story converted to resume successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert story', details: error.message });
  }
};
