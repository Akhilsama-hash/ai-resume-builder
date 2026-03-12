import { actionVerbs, weakVerbs, jobSkillsDatabase } from '../utils/aiData.js';
import { analyzeKeywords, calculateReadability } from '../utils/textAnalysis.js';

/**
 * AI-Powered Text Enhancement
 * Replaces weak verbs with strong action verbs and improves sentence structure
 */
export const enhanceTextWithAI = async (text, context = 'general') => {
  let enhanced = text;

  // Replace weak verbs with strong action verbs
  weakVerbs.forEach(weak => {
    const regex = new RegExp(`\\b${weak}\\b`, 'gi');
    if (regex.test(enhanced)) {
      const replacement = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      enhanced = enhanced.replace(regex, replacement);
    }
  });

  // Remove passive voice indicators
  enhanced = enhanced.replace(/\b(was|were|been|being)\s+(\w+ed)\b/gi, (match, aux, verb) => {
    return actionVerbs[Math.floor(Math.random() * actionVerbs.length)] + ' ' + verb.replace(/ed$/, '');
  });

  // Add quantifiable metrics if missing
  if (!/\d+/.test(enhanced) && enhanced.length > 20) {
    const metrics = ['20%', '3x', '50+', '$100K', '10 projects'];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    enhanced = enhanced.replace(/\.$/, `, resulting in ${randomMetric} improvement.`);
  }

  // Capitalize first letter
  enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);

  // Ensure proper ending
  if (!enhanced.match(/[.!?]$/)) {
    enhanced += '.';
  }

  return enhanced;
};

/**
 * Enhanced ATS Score Calculator
 * Analyzes resume for Applicant Tracking System compatibility with precise scoring
 * Returns detailed score out of 100 with comprehensive feedback
 */
export const calculateATS = async (resumeData) => {
  let totalScore = 0;
  const feedback = [];
  const suggestions = [];
  const breakdown = {};

  // 1. CONTACT INFORMATION (10 points)
  let contactScore = 0;
  if (resumeData.name && resumeData.name.trim().length > 0) {
    contactScore += 3;
  } else {
    suggestions.push('Add your full name');
  }
  if (resumeData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.email)) {
    contactScore += 3;
  } else {
    suggestions.push('Add a valid email address');
  }
  if (resumeData.phone && resumeData.phone.trim().length > 0) {
    contactScore += 2;
  } else {
    suggestions.push('Add phone number');
  }
  if (resumeData.location && resumeData.location.trim().length > 0) {
    contactScore += 2;
  } else {
    suggestions.push('Add location (City, State)');
  }
  totalScore += contactScore;
  breakdown.contact = { score: contactScore, max: 10 };
  if (contactScore === 10) feedback.push('✓ Complete contact information');

  // 2. PROFESSIONAL SUMMARY (15 points)
  let summaryScore = 0;
  if (resumeData.summary && resumeData.summary.trim().length > 0) {
    const summaryLength = resumeData.summary.trim().length;
    const wordCount = resumeData.summary.trim().split(/\s+/).length;
    
    if (summaryLength >= 150 && summaryLength <= 300 && wordCount >= 30) {
      summaryScore = 15; // Perfect length
      feedback.push('✓ Excellent professional summary (optimal length)');
    } else if (summaryLength >= 100 && summaryLength < 150) {
      summaryScore = 12; // Good but short
      suggestions.push('Expand your professional summary (aim for 150-300 characters)');
    } else if (summaryLength >= 50 && summaryLength < 100) {
      summaryScore = 8; // Too short
      suggestions.push('Professional summary is too brief (add more details)');
    } else if (summaryLength > 300) {
      summaryScore = 10; // Too long
      suggestions.push('Professional summary is too long (keep it concise, 150-300 characters)');
    } else {
      summaryScore = 5; // Very short
      suggestions.push('Add a comprehensive professional summary (3-4 sentences)');
    }
    
    // Check for keywords in summary
    const hasKeywords = /experience|skilled|proficient|expert|specialized|passionate|results-driven|innovative/i.test(resumeData.summary);
    if (!hasKeywords && summaryScore > 0) {
      summaryScore -= 2;
      suggestions.push('Include power words in summary (e.g., "experienced", "skilled", "results-driven")');
    }
  } else {
    suggestions.push('Add a professional summary highlighting your key strengths');
  }
  totalScore += summaryScore;
  breakdown.summary = { score: summaryScore, max: 15 };

  // 3. SKILLS SECTION (20 points)
  let skillsScore = 0;
  const skillCount = resumeData.skills ? resumeData.skills.length : 0;
  
  if (skillCount >= 10) {
    skillsScore = 20; // Excellent
    feedback.push(`✓ Strong skills section (${skillCount} skills)`);
  } else if (skillCount >= 8) {
    skillsScore = 18; // Very good
    feedback.push(`✓ Good skills section (${skillCount} skills)`);
  } else if (skillCount >= 6) {
    skillsScore = 15; // Good
    suggestions.push(`Add 2-4 more relevant skills (currently ${skillCount})`);
  } else if (skillCount >= 4) {
    skillsScore = 10; // Fair
    suggestions.push(`Add more skills (aim for 8-12 skills, currently ${skillCount})`);
  } else if (skillCount >= 1) {
    skillsScore = 5; // Poor
    suggestions.push(`Skills section is weak (add at least 8 relevant skills, currently ${skillCount})`);
  } else {
    suggestions.push('Add a skills section with 8-12 relevant technical and soft skills');
  }
  totalScore += skillsScore;
  breakdown.skills = { score: skillsScore, max: 20 };

  // 4. WORK EXPERIENCE (30 points)
  let experienceScore = 0;
  const expCount = resumeData.experience ? resumeData.experience.length : 0;
  
  if (expCount > 0) {
    // Points for having experience entries (10 points)
    if (expCount >= 3) {
      experienceScore += 10;
      feedback.push(`✓ Multiple work experiences listed (${expCount})`);
    } else if (expCount === 2) {
      experienceScore += 8;
    } else {
      experienceScore += 6;
      suggestions.push('Add more work experience or relevant projects');
    }
    
    // Check quality of experience descriptions (20 points)
    let descriptionQuality = 0;
    let hasActionVerbs = false;
    let hasMetrics = false;
    let totalDescLength = 0;
    
    resumeData.experience.forEach(exp => {
      if (exp.title && exp.title.trim().length > 0) descriptionQuality += 1;
      if (exp.company && exp.company.trim().length > 0) descriptionQuality += 1;
      if (exp.duration && exp.duration.trim().length > 0) descriptionQuality += 1;
      
      if (exp.description && exp.description.trim().length > 0) {
        totalDescLength += exp.description.length;
        
        // Check for action verbs
        const hasVerb = actionVerbs.some(verb => 
          exp.description.toLowerCase().includes(verb.toLowerCase())
        );
        if (hasVerb) hasActionVerbs = true;
        
        // Check for quantifiable metrics
        if (/\d+%|\d+x|\d+ |\$\d+|increased|decreased|improved|reduced|grew|saved/i.test(exp.description)) {
          hasMetrics = true;
        }
      }
    });
    
    // Award points based on description quality
    const avgDescLength = totalDescLength / expCount;
    if (avgDescLength >= 100) {
      experienceScore += 8;
      feedback.push('✓ Detailed experience descriptions');
    } else if (avgDescLength >= 50) {
      experienceScore += 5;
      suggestions.push('Expand experience descriptions (add more details about achievements)');
    } else if (avgDescLength > 0) {
      experienceScore += 3;
      suggestions.push('Experience descriptions are too brief (add specific achievements)');
    } else {
      suggestions.push('Add descriptions to your work experience');
    }
    
    // Action verbs (6 points)
    if (hasActionVerbs) {
      experienceScore += 6;
      feedback.push('✓ Uses strong action verbs in experience');
    } else {
      suggestions.push('Start experience bullets with action verbs (e.g., Developed, Implemented, Led)');
    }
    
    // Quantifiable metrics (6 points)
    if (hasMetrics) {
      experienceScore += 6;
      feedback.push('✓ Includes quantifiable achievements');
    } else {
      suggestions.push('Add measurable results to experience (e.g., "increased efficiency by 25%")');
    }
  } else {
    suggestions.push('Add work experience, internships, or relevant projects');
  }
  totalScore += experienceScore;
  breakdown.experience = { score: experienceScore, max: 30 };

  // 5. EDUCATION (10 points)
  let educationScore = 0;
  const eduCount = resumeData.education ? resumeData.education.length : 0;
  
  if (eduCount > 0) {
    let eduQuality = 0;
    resumeData.education.forEach(edu => {
      if (edu.degree && edu.degree.trim().length > 0) eduQuality += 3;
      if (edu.institution && edu.institution.trim().length > 0) eduQuality += 2;
      if (edu.year && edu.year.trim().length > 0) eduQuality += 1;
    });
    
    educationScore = Math.min(eduQuality, 10);
    if (educationScore >= 8) {
      feedback.push('✓ Complete education information');
    } else {
      suggestions.push('Complete all education fields (degree, institution, year)');
    }
  } else {
    suggestions.push('Add your education background');
  }
  totalScore += educationScore;
  breakdown.education = { score: educationScore, max: 10 };

  // 6. PROJECTS (Optional but valuable - 5 points)
  let projectsScore = 0;
  const projectCount = resumeData.projects ? resumeData.projects.length : 0;
  
  if (projectCount > 0) {
    if (projectCount >= 2) {
      projectsScore = 5;
      feedback.push(`✓ Includes relevant projects (${projectCount})`);
    } else {
      projectsScore = 3;
      suggestions.push('Add more projects to showcase your skills');
    }
  }
  totalScore += projectsScore;
  breakdown.projects = { score: projectsScore, max: 5 };

  // 7. KEYWORD OPTIMIZATION (10 points)
  let keywordScore = 0;
  const allText = JSON.stringify(resumeData).toLowerCase();
  const keywordCount = analyzeKeywords(allText);
  const readabilityScore = calculateReadability(resumeData.summary || '');
  
  if (keywordCount >= 15) {
    keywordScore = 10;
    feedback.push('✓ Excellent keyword density');
  } else if (keywordCount >= 10) {
    keywordScore = 7;
    feedback.push('✓ Good keyword usage');
  } else if (keywordCount >= 5) {
    keywordScore = 4;
    suggestions.push('Include more industry-specific keywords throughout resume');
  } else {
    keywordScore = 2;
    suggestions.push('Add relevant keywords that match job descriptions');
  }
  totalScore += keywordScore;
  breakdown.keywords = { score: keywordScore, max: 10 };

  // Calculate final score and grade
  const finalScore = Math.round(totalScore);
  let grade, color;
  
  if (finalScore >= 90) {
    grade = 'Excellent';
    color = 'green';
  } else if (finalScore >= 80) {
    grade = 'Very Good';
    color = 'blue';
  } else if (finalScore >= 70) {
    grade = 'Good';
    color = 'lightblue';
  } else if (finalScore >= 60) {
    grade = 'Fair';
    color = 'yellow';
  } else if (finalScore >= 50) {
    grade = 'Needs Improvement';
    color = 'orange';
  } else {
    grade = 'Poor';
    color = 'red';
  }

  return {
    score: finalScore,
    grade,
    color,
    breakdown,
    feedback,
    suggestions,
    details: {
      totalPossible: 100,
      categoriesScored: Object.keys(breakdown).length,
      completeness: Math.round((finalScore / 100) * 100) + '%'
    }
  };
};

/**
 * Job Match Intelligence
 * Suggests skills and keywords based on target job title
 */
export const getJobSkills = async (jobTitle, currentSkills = []) => {
  const normalizedTitle = jobTitle.toLowerCase();
  
  // Find matching job in database
  let matchedJob = null;
  for (const [key, value] of Object.entries(jobSkillsDatabase)) {
    if (normalizedTitle.includes(key.toLowerCase())) {
      matchedJob = value;
      break;
    }
  }

  // Default to software developer if no match
  if (!matchedJob) {
    matchedJob = jobSkillsDatabase['Software Developer'];
  }

  // Filter out skills user already has
  const newSkills = matchedJob.skills.filter(
    skill => !currentSkills.some(cs => cs.toLowerCase() === skill.toLowerCase())
  );

  return {
    skills: newSkills.slice(0, 8),
    keywords: matchedJob.keywords,
    recommendations: [
      `Add ${newSkills.slice(0, 3).join(', ')} to your skills section`,
      `Include keywords like "${matchedJob.keywords.slice(0, 3).join('", "')}" in your experience`,
      `Highlight projects related to ${matchedJob.keywords[0]}`
    ]
  };
};

/**
 * Professional Summary Generator
 * Creates compelling summary based on user background
 */
export const generateSummary = async ({ name, role, experience, skills }) => {
  const yearsExp = experience || 'aspiring';
  const topSkills = skills && skills.length > 0 
    ? skills.slice(0, 3).join(', ') 
    : 'various technologies';

  const templates = [
    `${yearsExp === 'aspiring' ? 'Motivated' : 'Results-driven'} ${role} with ${yearsExp === 'aspiring' ? 'strong foundation' : `${yearsExp}+ years of experience`} in ${topSkills}. Proven track record of delivering high-quality solutions and driving innovation. Passionate about leveraging technology to solve complex problems and create impactful user experiences.`,
    
    `Dynamic ${role} specializing in ${topSkills}. ${yearsExp === 'aspiring' ? 'Quick learner with hands-on project experience' : `${yearsExp}+ years of professional experience`} building scalable applications and collaborating with cross-functional teams. Committed to continuous learning and staying current with industry trends.`,
    
    `Innovative ${role} with expertise in ${topSkills}. ${yearsExp === 'aspiring' ? 'Strong academic background and practical project experience' : `${yearsExp}+ years delivering enterprise-level solutions`}. Skilled at translating business requirements into technical solutions while maintaining code quality and best practices.`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
};

/**
 * Bullet Point Enhancer
 * Improves individual bullet points with action verbs and impact
 */
export const enhanceBullet = async (bullet, role = '') => {
  let enhanced = bullet.trim();

  // Ensure starts with action verb
  const startsWithActionVerb = actionVerbs.some(verb => 
    enhanced.toLowerCase().startsWith(verb.toLowerCase())
  );

  if (!startsWithActionVerb) {
    const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    enhanced = `${verb} ${enhanced}`;
  }

  // Add impact if missing
  if (!/\d+%|\d+x|increased|improved|reduced|saved/i.test(enhanced)) {
    const impacts = [
      ', improving efficiency by 25%',
      ', resulting in 30% faster delivery',
      ', reducing costs by $10K annually',
      ', increasing user satisfaction by 40%',
      ', leading to 3x performance improvement'
    ];
    enhanced += impacts[Math.floor(Math.random() * impacts.length)];
  }

  // Ensure proper ending
  if (!enhanced.match(/[.!]$/)) {
    enhanced += '.';
  }

  return enhanced;
};


/**
 * Story to Resume Converter
 * Extracts structured resume data from user's story/text
 */
export const convertStoryToResume = async (story) => {
  const resumeData = {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: []
  };

  const text = story.trim();

  // Extract Name (look for "I'm", "My name is", "I am")
  const namePatterns = [
    /(?:I'm|I am|My name is|This is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/
  ];
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      resumeData.name = match[1].trim();
      break;
    }
  }

  // Extract Email
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) {
    resumeData.email = emailMatch[1];
  }

  // Extract Phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    resumeData.phone = phoneMatch[0];
  }

  // Extract Location (city, state patterns)
  const locationMatch = text.match(/(?:from|in|at|live in|based in|located in)\s+([A-Z][a-z]+(?:,?\s+[A-Z]{2})?)/i);
  if (locationMatch) {
    resumeData.location = locationMatch[1];
  }

  // Extract Education
  const educationKeywords = ['graduated', 'degree', 'bachelor', 'master', 'phd', 'university', 'college', 'studied'];
  const educationSentences = text.split(/[.!?]/).filter(sentence => 
    educationKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  );

  educationSentences.forEach(sentence => {
    const degreeMatch = sentence.match(/(Bachelor|Master|PhD|B\.S\.|M\.S\.|B\.A\.|M\.A\.|Associate)(?:'s)?(?:\s+(?:of|in|degree in))?\s+([A-Za-z\s]+)/i);
    const universityMatch = sentence.match(/(University|College|Institute)\s+(?:of\s+)?([A-Za-z\s]+)|([A-Za-z\s]+)\s+(University|College|Institute)/i);
    const yearMatch = sentence.match(/\b(19|20)\d{2}\b/);

    if (degreeMatch || universityMatch) {
      resumeData.education.push({
        degree: degreeMatch ? `${degreeMatch[1]} ${degreeMatch[2]}`.trim() : 'Degree',
        institution: universityMatch ? universityMatch[0].trim() : 'University',
        year: yearMatch ? yearMatch[0] : '',
        gpa: ''
      });
    }
  });

  // Extract Work Experience
  const experienceKeywords = ['worked', 'working', 'developer', 'engineer', 'manager', 'analyst', 'designer', 'intern', 'job', 'position', 'role'];
  const companySuffixes = ['Inc', 'LLC', 'Corp', 'Company', 'Technologies', 'Systems', 'Solutions'];
  
  const experienceSentences = text.split(/[.!?]/).filter(sentence => 
    experienceKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  );

  experienceSentences.forEach(sentence => {
    const titleMatch = sentence.match(/(Software|Frontend|Backend|Full Stack|Data|DevOps|Product|UI\/UX|Mobile|Machine Learning|Senior|Junior|Lead)?\s*(Developer|Engineer|Analyst|Designer|Manager|Architect|Specialist|Consultant)/i);
    const companyMatch = sentence.match(/(?:at|for|with)\s+([A-Z][A-Za-z0-9\s&]+(?:Inc|LLC|Corp|Company|Technologies|Systems|Solutions)?)/);
    const durationMatch = sentence.match(/(\d+)\s*(?:year|yr)s?/i);

    if (titleMatch) {
      const title = titleMatch[0].trim();
      const company = companyMatch ? companyMatch[1].trim() : 'Company';
      const duration = durationMatch ? `${durationMatch[1]} years` : 'Present';

      resumeData.experience.push({
        title: title,
        company: company,
        duration: duration,
        description: sentence.trim()
      });
    }
  });

  // Extract Skills
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go', 'Rust',
    'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel',
    'HTML', 'CSS', 'TypeScript', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'Jenkins',
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
    'Agile', 'Scrum', 'REST API', 'GraphQL', 'Microservices', 'DevOps',
    'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Project Management'
  ];

  commonSkills.forEach(skill => {
    // Escape special regex characters in skill names
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    if (regex.test(text) && !resumeData.skills.includes(skill)) {
      resumeData.skills.push(skill);
    }
  });

  // Extract Projects
  const projectKeywords = ['built', 'created', 'developed', 'project', 'app', 'application', 'website', 'system'];
  const projectSentences = text.split(/[.!?]/).filter(sentence => 
    projectKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  );

  projectSentences.forEach(sentence => {
    const projectMatch = sentence.match(/(built|created|developed)\s+(?:a|an)?\s*([^,]+)/i);
    if (projectMatch && sentence.length > 30) {
      const technologies = [];
      commonSkills.forEach(skill => {
        // Escape special regex characters
        const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (new RegExp(`\\b${escapedSkill}\\b`, 'i').test(sentence)) {
          technologies.push(skill);
        }
      });

      resumeData.projects.push({
        name: projectMatch[2].trim() || 'Project',
        technologies: technologies.join(', ') || 'Various Technologies',
        details: sentence.trim()
      });
    }
  });

  // Generate Professional Summary from the story
  const summaryParts = [];
  if (resumeData.name) summaryParts.push(resumeData.name);
  if (resumeData.experience.length > 0) {
    summaryParts.push(`${resumeData.experience[0].title}`);
  }
  if (resumeData.skills.length > 0) {
    summaryParts.push(`skilled in ${resumeData.skills.slice(0, 3).join(', ')}`);
  }
  
  if (summaryParts.length > 0) {
    resumeData.summary = `${summaryParts.join(' - ')}. ${text.split(/[.!?]/)[0]}.`;
    if (resumeData.summary.length > 300) {
      resumeData.summary = resumeData.summary.substring(0, 297) + '...';
    }
  } else {
    resumeData.summary = text.split(/[.!?]/).slice(0, 2).join('. ') + '.';
  }

  return resumeData;
};
