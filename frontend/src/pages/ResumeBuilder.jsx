import { useState, useEffect } from 'react';
import { FiDownload, FiZap, FiTarget, FiAward, FiFileText } from 'react-icons/fi';
import Header from '../components/Header';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import ATSScoreCard from '../components/ATSScoreCard';
import JobMatchModal from '../components/JobMatchModal';
import StoryToResumeModal from '../components/StoryToResumeModal';
import { calculateATSScore } from '../services/api';
import { exportToPDF } from '../utils/pdfExport';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: []
  });

  const [atsScore, setAtsScore] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showJobMatch, setShowJobMatch] = useState(false);
  const [showStoryConverter, setShowStoryConverter] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate ATS score whenever resume data changes
  useEffect(() => {
    const calculateScore = async () => {
      if (resumeData.name || resumeData.email) {
        setIsCalculating(true);
        try {
          const result = await calculateATSScore(resumeData);
          setAtsScore(result);
        } catch (error) {
          console.error('Failed to calculate ATS score:', error);
        } finally {
          setIsCalculating(false);
        }
      }
    };

    const debounce = setTimeout(calculateScore, 1000);
    return () => clearTimeout(debounce);
  }, [resumeData]);

  const handleExportPDF = () => {
    exportToPDF(resumeData, selectedTemplate);
  };

  const handleApplyStoryData = (storyData) => {
    setResumeData(prev => ({
      ...prev,
      name: storyData.name || prev.name,
      email: storyData.email || prev.email,
      phone: storyData.phone || prev.phone,
      location: storyData.location || prev.location,
      summary: storyData.summary || prev.summary,
      skills: [...new Set([...prev.skills, ...storyData.skills])],
      experience: [...prev.experience, ...storyData.experience],
      education: [...prev.education, ...storyData.education],
      projects: [...prev.projects, ...storyData.projects]
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              AI-Powered Resume Builder
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Create professional, ATS-optimized resumes in minutes
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <FiZap className="text-yellow-300" />
                <span>AI Content Enhancement</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <FiAward className="text-yellow-300" />
                <span>ATS Optimization</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <FiTarget className="text-yellow-300" />
                <span>Job Match AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setShowStoryConverter(true)}
              className="btn-primary flex items-center gap-2"
            >
              <FiFileText />
              Story-to-Resume
            </button>
            <button
              onClick={() => setShowJobMatch(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <FiTarget />
              AI Job Match
            </button>
            <button
              onClick={handleExportPDF}
              className="btn-secondary flex items-center gap-2"
            >
              <FiDownload />
              Export PDF
            </button>
          </div>

          {/* Template Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTemplate('modern')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTemplate === 'modern'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Modern
            </button>
            <button
              onClick={() => setSelectedTemplate('classic')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTemplate === 'classic'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setSelectedTemplate('creative')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTemplate === 'creative'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Creative
            </button>
          </div>
        </div>

        {/* ATS Score Card */}
        {atsScore && (
          <div className="mb-8 animate-slide-up">
            <ATSScoreCard 
              score={atsScore.score} 
              grade={atsScore.grade}
              feedback={atsScore.feedback}
              suggestions={atsScore.suggestions}
              isCalculating={isCalculating}
              breakdown={atsScore.breakdown}
              details={atsScore.details}
            />
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <ResumeForm 
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="card">
              <h2 className="section-title mb-4">Live Preview</h2>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <ResumePreview 
                  data={resumeData}
                  template={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Match Modal */}
      {showJobMatch && (
        <JobMatchModal
          currentSkills={resumeData.skills}
          onClose={() => setShowJobMatch(false)}
          onApplySkills={(skills) => {
            setResumeData(prev => ({
              ...prev,
              skills: [...new Set([...prev.skills, ...skills])]
            }));
          }}
        />
      )}

      {/* Story to Resume Modal */}
      {showStoryConverter && (
        <StoryToResumeModal
          onClose={() => setShowStoryConverter(false)}
          onApplyData={handleApplyStoryData}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
