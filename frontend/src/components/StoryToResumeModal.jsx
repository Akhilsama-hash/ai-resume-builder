import { useState } from 'react';
import { FiFileText, FiZap, FiX } from 'react-icons/fi';

const StoryToResumeModal = ({ onClose, onApplyData }) => {
  const [storyText, setStoryText] = useState('');
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    if (!storyText.trim()) {
      alert('Please enter your story or background information');
      return;
    }

    setConverting(true);
    try {
      const response = await fetch('http://localhost:5000/api/story-to-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story: storyText })
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.resumeData);
      } else {
        alert('Failed to convert story. Please try again.');
      }
    } catch (error) {
      console.error('Error converting story:', error);
      alert('Failed to convert story. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const handleApply = () => {
    if (result) {
      onApplyData(result);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <FiFileText />
                Story-to-Resume Converter
              </h2>
              <p className="text-sm opacity-90">
                Tell us your story, and AI will create a structured resume for you!
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!result ? (
            <>
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📝 How to use:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Write about your background, education, work experience, and skills</li>
                  <li>• Include any projects, achievements, or certifications</li>
                  <li>• Be as detailed as you want - AI will organize it for you</li>
                  <li>• You can write in paragraph form or bullet points</li>
                </ul>
              </div>

              {/* Example */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">💡 Example:</h3>
                <p className="text-sm text-green-800 italic">
                  "Hi, I'm John Doe. I graduated from MIT with a Computer Science degree in 2020. 
                  I've been working as a software developer at Google for 2 years, where I developed 
                  web applications using React and Node.js. I also built a mobile app that got 10,000 
                  downloads. My skills include JavaScript, Python, React, and AWS. I'm passionate about 
                  creating user-friendly applications."
                </p>
              </div>

              {/* Text Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story / Background:
                </label>
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Start typing your story here... Tell us about your education, work experience, skills, projects, and achievements. Write naturally - AI will structure it into a professional resume!"
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {storyText.length} characters • Minimum 100 characters recommended
                </p>
              </div>

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={converting || storyText.length < 50}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiZap />
                {converting ? 'Converting Your Story...' : 'Convert to Resume'}
              </button>
            </>
          ) : (
            <>
              {/* Result Preview */}
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Conversion Complete!</h3>
                  <p className="text-sm text-green-800">
                    AI has extracted and structured your information. Review below and click "Apply to Resume" to use it.
                  </p>
                </div>

                {/* Extracted Data Preview */}
                <div className="space-y-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {result.name && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Name:</h4>
                      <p className="text-gray-700">{result.name}</p>
                    </div>
                  )}

                  {result.email && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Email:</h4>
                      <p className="text-gray-700">{result.email}</p>
                    </div>
                  )}

                  {result.phone && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone:</h4>
                      <p className="text-gray-700">{result.phone}</p>
                    </div>
                  )}

                  {result.summary && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Professional Summary:</h4>
                      <p className="text-gray-700">{result.summary}</p>
                    </div>
                  )}

                  {result.skills && result.skills.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Skills ({result.skills.length}):</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {result.skills.map((skill, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.experience && result.experience.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Work Experience ({result.experience.length}):</h4>
                      {result.experience.map((exp, idx) => (
                        <div key={idx} className="mt-2 pl-4 border-l-2 border-purple-300">
                          <p className="font-medium">{exp.title} at {exp.company}</p>
                          <p className="text-sm text-gray-600">{exp.duration}</p>
                          <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {result.education && result.education.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Education ({result.education.length}):</h4>
                      {result.education.map((edu, idx) => (
                        <div key={idx} className="mt-2 pl-4 border-l-2 border-purple-300">
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-600">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {result.projects && result.projects.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Projects ({result.projects.length}):</h4>
                      {result.projects.map((project, idx) => (
                        <div key={idx} className="mt-2 pl-4 border-l-2 border-purple-300">
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-gray-600">{project.technologies}</p>
                          <p className="text-sm text-gray-700 mt-1">{project.details}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setResult(null)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleApply}
                    className="flex-1 btn-primary"
                  >
                    Apply to Resume
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryToResumeModal;
