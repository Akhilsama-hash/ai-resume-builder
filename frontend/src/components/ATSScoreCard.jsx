import { FiCheckCircle, FiAlertCircle, FiTrendingUp, FiInfo } from 'react-icons/fi';
import { useState } from 'react';

const ATSScoreCard = ({ score, grade, feedback, suggestions, isCalculating, breakdown, details }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryColor = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">ATS Compatibility Score</h3>
          <p className="text-sm text-gray-600">Real-time analysis of your resume</p>
        </div>
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-primary-600 text-xl" />
          {isCalculating && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Display */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(score)}`}>
            <div>
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-sm text-gray-600">out of 100</div>
            </div>
          </div>
          <div className={`mt-3 text-lg font-semibold ${getScoreColor(score)}`}>
            {grade}
          </div>
        </div>

        {/* Feedback */}
        <div className="md:col-span-2 space-y-4">
          {feedback && feedback.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FiCheckCircle className="text-green-600" />
                What's Working
              </h4>
              <ul className="space-y-1">
                {feedback.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {suggestions && suggestions.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FiAlertCircle className="text-yellow-600" />
                Suggestions for Improvement
              </h4>
              <ul className="space-y-1">
                {suggestions.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              score >= 90 ? 'bg-green-500' :
              score >= 75 ? 'bg-blue-500' :
              score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      {breakdown && (
        <div className="mt-6">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            <FiInfo />
            {showBreakdown ? 'Hide' : 'Show'} Detailed Breakdown
          </button>
          
          {showBreakdown && (
            <div className="mt-4 space-y-3 bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Score Breakdown by Category:</h4>
              
              {Object.entries(breakdown).map(([category, data]) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium capitalize text-gray-700">
                      {category === 'contact' ? 'Contact Info' :
                       category === 'summary' ? 'Professional Summary' :
                       category === 'skills' ? 'Skills' :
                       category === 'experience' ? 'Work Experience' :
                       category === 'education' ? 'Education' :
                       category === 'projects' ? 'Projects' :
                       category === 'keywords' ? 'Keywords' : category}
                    </span>
                    <span className="font-bold">
                      {data.score}/{data.max}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getCategoryColor(data.score, data.max)}`}
                      style={{ width: `${(data.score / data.max) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((data.score / data.max) * 100)}% complete
                  </div>
                </div>
              ))}
              
              {details && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <p><strong>Total Score:</strong> {score}/100</p>
                    <p><strong>Categories Evaluated:</strong> {details.categoriesScored}</p>
                    <p><strong>Overall Completeness:</strong> {details.completeness}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSScoreCard;
