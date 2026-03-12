import { useState } from 'react';
import { FiX, FiTarget, FiPlus } from 'react-icons/fi';
import { getJobMatchSuggestions } from '../services/api';

const JobMatchModal = ({ currentSkills, onClose, onApplySkills }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSearch = async () => {
    if (!jobTitle.trim()) {
      alert('Please enter a job title');
      return;
    }

    setLoading(true);
    try {
      const result = await getJobMatchSuggestions(jobTitle, currentSkills);
      setSuggestions(result);
      setSelectedSkills([]);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      alert('Failed to get suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleApply = () => {
    if (selectedSkills.length > 0) {
      onApplySkills(selectedSkills);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <FiTarget />
                AI Job Match
              </h2>
              <p className="text-sm opacity-90">
                Get personalized skill recommendations for your target role
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
          {/* Search Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Job Title
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g., Frontend Developer, Data Scientist..."
                className="input-field flex-1"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="btn-primary whitespace-nowrap"
              >
                {loading ? 'Analyzing...' : 'Get Suggestions'}
              </button>
            </div>
          </div>

          {/* Results */}
          {suggestions && (
            <div className="space-y-6 animate-fade-in">
              {/* Suggested Skills */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm">
                    {suggestions.suggestedSkills.length}
                  </span>
                  Recommended Skills for {suggestions.jobTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.suggestedSkills.map((skill, index) => (
                    <button
                      key={index}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedSkills.includes(skill)
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && (
                        <span className="ml-2">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Important Keywords to Include
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {suggestions.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  AI Recommendations
                </h3>
                <div className="space-y-2">
                  {suggestions.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-3"
                    >
                      <span className="text-green-600 mt-0.5">💡</span>
                      <p className="text-sm text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!suggestions && !loading && (
            <div className="text-center py-12">
              <FiTarget className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500">
                Enter a job title to get AI-powered skill recommendations
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {suggestions && (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={selectedSkills.length === 0}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiPlus />
                  Add to Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatchModal;
