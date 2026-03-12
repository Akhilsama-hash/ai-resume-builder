import { FiBarChart2, FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';

const ResumeAnalytics = ({ resumeData }) => {
  const calculateCompleteness = () => {
    let score = 0;
    let total = 7;
    
    if (resumeData.name) score++;
    if (resumeData.email) score++;
    if (resumeData.phone) score++;
    if (resumeData.summary && resumeData.summary.length > 50) score++;
    if (resumeData.skills && resumeData.skills.length >= 5) score++;
    if (resumeData.experience && resumeData.experience.length > 0) score++;
    if (resumeData.education && resumeData.education.length > 0) score++;
    
    return Math.round((score / total) * 100);
  };

  const getIssues = () => {
    const issues = [];
    
    if (!resumeData.name) issues.push('Missing name');
    if (!resumeData.email) issues.push('Missing email');
    if (!resumeData.phone) issues.push('Missing phone number');
    if (!resumeData.summary || resumeData.summary.length < 50) 
      issues.push('Summary too short (min 50 chars)');
    if (!resumeData.skills || resumeData.skills.length < 5) 
      issues.push('Add at least 5 skills');
    if (!resumeData.experience || resumeData.experience.length === 0) 
      issues.push('Add work experience');
    if (!resumeData.education || resumeData.education.length === 0) 
      issues.push('Add education');
    
    return issues;
  };

  const completeness = calculateCompleteness();
  const issues = getIssues();

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FiBarChart2 className="text-purple-600" />
        Resume Analytics
      </h3>

      <div className="space-y-4">
        {/* Completeness Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Completeness</span>
            <span className="text-lg font-bold text-purple-600">{completeness}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                completeness >= 80 ? 'bg-green-500' : 
                completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-blue-600 font-semibold">Skills</div>
            <div className="text-2xl font-bold text-blue-700">
              {resumeData.skills?.length || 0}
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-green-600 font-semibold">Experience</div>
            <div className="text-2xl font-bold text-green-700">
              {resumeData.experience?.length || 0}
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-purple-600 font-semibold">Education</div>
            <div className="text-2xl font-bold text-purple-700">
              {resumeData.education?.length || 0}
            </div>
          </div>
          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="text-pink-600 font-semibold">Projects</div>
            <div className="text-2xl font-bold text-pink-700">
              {resumeData.projects?.length || 0}
            </div>
          </div>
        </div>

        {/* Issues */}
        {issues.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <FiAlertTriangle className="text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">
                  {issues.length} Issue{issues.length > 1 ? 's' : ''} Found
                </h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  {issues.map((issue, idx) => (
                    <li key={idx}>• {issue}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {completeness === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
            <FiTrendingUp className="text-green-600" />
            <span className="text-green-800 font-medium">
              🎉 Your resume is complete!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalytics;
