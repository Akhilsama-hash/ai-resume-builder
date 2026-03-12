import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Enhance resume content with AI
 */
export const enhanceContent = async (text, context = 'general') => {
  try {
    const response = await api.post('/enhance-content', { text, context });
    return response.data;
  } catch (error) {
    console.error('Error enhancing content:', error);
    throw error;
  }
};

/**
 * Calculate ATS score for resume
 */
export const calculateATSScore = async (resumeData) => {
  try {
    const response = await api.post('/calculate-ats-score', { resumeData });
    return response.data;
  } catch (error) {
    console.error('Error calculating ATS score:', error);
    throw error;
  }
};

/**
 * Get job-specific skill suggestions
 */
export const getJobMatchSuggestions = async (jobTitle, currentSkills = []) => {
  try {
    const response = await api.post('/job-match', { jobTitle, currentSkills });
    return response.data;
  } catch (error) {
    console.error('Error getting job suggestions:', error);
    throw error;
  }
};

/**
 * Generate professional summary
 */
export const generateSummary = async (userData) => {
  try {
    const response = await api.post('/generate-summary', userData);
    return response.data;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

/**
 * Improve bullet point
 */
export const improveBulletPoint = async (bullet, role = '') => {
  try {
    const response = await api.post('/improve-bullet', { bullet, role });
    return response.data;
  } catch (error) {
    console.error('Error improving bullet:', error);
    throw error;
  }
};

export default api;
