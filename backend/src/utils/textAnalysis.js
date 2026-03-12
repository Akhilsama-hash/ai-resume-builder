/**
 * Analyze keyword density in text
 * Returns count of relevant professional keywords
 */
export const analyzeKeywords = (text) => {
  const keywords = [
    'developed', 'implemented', 'designed', 'managed', 'led',
    'created', 'built', 'improved', 'optimized', 'achieved',
    'project', 'team', 'system', 'application', 'solution',
    'experience', 'skills', 'technical', 'professional', 'business'
  ];

  let count = 0;
  keywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = text.match(regex);
    if (matches) count += matches.length;
  });

  return count;
};

/**
 * Calculate readability score
 * Simple algorithm based on sentence and word length
 */
export const calculateReadability = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;

  // Ideal: 15-20 words per sentence, 4-6 chars per word
  let score = 100;
  
  if (avgWordsPerSentence > 25) score -= 20;
  else if (avgWordsPerSentence < 10) score -= 10;
  
  if (avgWordLength > 7) score -= 15;
  else if (avgWordLength < 4) score -= 10;

  return Math.max(0, Math.min(100, score));
};

/**
 * Extract skills from text
 * Identifies technical and professional skills mentioned
 */
export const extractSkills = (text) => {
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js',
    'SQL', 'AWS', 'Docker', 'Git', 'Agile',
    'Leadership', 'Communication', 'Problem Solving', 'Teamwork'
  ];

  const found = [];
  commonSkills.forEach(skill => {
    if (new RegExp(skill, 'i').test(text)) {
      found.push(skill);
    }
  });

  return found;
};
