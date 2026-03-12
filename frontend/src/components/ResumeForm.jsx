import { useState } from 'react';
import { FiPlus, FiTrash2, FiZap } from 'react-icons/fi';
import { enhanceContent, generateSummary, improveBulletPoint } from '../services/api';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [enhancing, setEnhancing] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [targetRole, setTargetRole] = useState('Software Developer');
  const [yearsOfExperience, setYearsOfExperience] = useState('2');

  // Job roles for dropdown
  const jobRoles = [
    'Software Developer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Data Analyst',
    'DevOps Engineer',
    'Product Manager',
    'UI/UX Designer',
    'Mobile Developer',
    'Machine Learning Engineer',
    'Cybersecurity Analyst',
    'Business Analyst',
    'QA Engineer',
    'Cloud Engineer'
  ];

  const handleChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const newArray = [...resumeData[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setResumeData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field, template) => {
    setResumeData(prev => ({
      ...prev,
      [field]: [...prev[field], template]
    }));
  };

  const removeArrayItem = (field, index) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleGenerateSummary = async () => {
    if (!resumeData.name) {
      alert('Please enter your name first');
      return;
    }
    
    if (!targetRole) {
      alert('Please select a target job role');
      return;
    }
    
    setGeneratingSummary(true);
    try {
      const result = await generateSummary({
        name: resumeData.name,
        role: targetRole,
        experience: yearsOfExperience,
        skills: resumeData.skills
      });
      handleChange('summary', result.summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleEnhanceBullet = async (field, index) => {
    const item = resumeData[field][index];
    const text = item.description || item.details;
    
    if (!text) return;

    setEnhancing(true);
    try {
      const result = await improveBulletPoint(text);
      handleArrayChange(field, index, field === 'experience' ? 'description' : 'details', result.improved);
    } catch (error) {
      console.error('Failed to enhance:', error);
    } finally {
      setEnhancing(false);
    }
  };

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="card">
        <h2 className="section-title">Personal Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name *"
            className="input-field"
            value={resumeData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email *"
            className="input-field"
            value={resumeData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="input-field"
            value={resumeData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <input
            type="text"
            placeholder="Location (City, State)"
            className="input-field"
            value={resumeData.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title mb-0">Professional Summary</h2>
          <button
            onClick={handleGenerateSummary}
            disabled={generatingSummary}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all text-sm"
          >
            <FiZap />
            {generatingSummary ? 'Generating...' : 'AI Generate'}
          </button>
        </div>
        
        {/* AI Generation Options */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 mb-3 font-medium">🤖 Customize AI Summary Generation:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Target Job Role *
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="input-field text-sm"
              >
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <select
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className="input-field text-sm"
              >
                <option value="aspiring">Fresher / Student</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5+ Years</option>
                <option value="8">8+ Years</option>
                <option value="10">10+ Years</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            💡 Tip: Select your target role and experience level, then click "AI Generate" for a customized summary!
          </p>
        </div>
        
        <textarea
          placeholder="Brief professional summary highlighting your key strengths..."
          className="input-field min-h-[100px]"
          value={resumeData.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </div>

      {/* Skills */}
      <div className="card">
        <h2 className="section-title">Skills</h2>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a skill (press Enter)"
              className="input-field"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSkill(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => {
                    setResumeData(prev => ({
                      ...prev,
                      skills: prev.skills.filter((_, i) => i !== index)
                    }));
                  }}
                  className="hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title mb-0">Work Experience</h2>
          <button
            onClick={() => addArrayItem('experience', {
              title: '',
              company: '',
              duration: '',
              description: ''
            })}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            <FiPlus />
            Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="input-field flex-1 mr-2"
                  value={exp.title}
                  onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                />
                <button
                  onClick={() => removeArrayItem('experience', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
              <input
                type="text"
                placeholder="Company Name"
                className="input-field"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration (e.g., Jan 2020 - Present)"
                className="input-field"
                value={exp.duration}
                onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
              />
              <div className="relative">
                <textarea
                  placeholder="Describe your responsibilities and achievements..."
                  className="input-field min-h-[80px]"
                  value={exp.description}
                  onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                />
                <button
                  onClick={() => handleEnhanceBullet('experience', index)}
                  disabled={enhancing}
                  className="absolute top-2 right-2 text-primary-600 hover:text-primary-700"
                  title="Enhance with AI"
                >
                  <FiZap />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title mb-0">Education</h2>
          <button
            onClick={() => addArrayItem('education', {
              degree: '',
              institution: '',
              year: '',
              gpa: ''
            })}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            <FiPlus />
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Degree (e.g., B.S. Computer Science)"
                  className="input-field flex-1 mr-2"
                  value={edu.degree}
                  onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                />
                <button
                  onClick={() => removeArrayItem('education', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
              <input
                type="text"
                placeholder="Institution Name"
                className="input-field"
                value={edu.institution}
                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Year (e.g., 2020-2024)"
                  className="input-field"
                  value={edu.year}
                  onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="GPA (optional)"
                  className="input-field"
                  value={edu.gpa}
                  onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title mb-0">Projects</h2>
          <button
            onClick={() => addArrayItem('projects', {
              name: '',
              technologies: '',
              details: ''
            })}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            <FiPlus />
            Add Project
          </button>
        </div>
        <div className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="input-field flex-1 mr-2"
                  value={project.name}
                  onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                />
                <button
                  onClick={() => removeArrayItem('projects', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
              <input
                type="text"
                placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
                className="input-field"
                value={project.technologies}
                onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
              />
              <div className="relative">
                <textarea
                  placeholder="Project description and key features..."
                  className="input-field min-h-[80px]"
                  value={project.details}
                  onChange={(e) => handleArrayChange('projects', index, 'details', e.target.value)}
                />
                <button
                  onClick={() => handleEnhanceBullet('projects', index)}
                  disabled={enhancing}
                  className="absolute top-2 right-2 text-primary-600 hover:text-primary-700"
                  title="Enhance with AI"
                >
                  <FiZap />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
