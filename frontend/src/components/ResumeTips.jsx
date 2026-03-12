import { FiInfo } from 'react-icons/fi';

const tips = {
  summary: [
    'Keep it 2-3 sentences highlighting your key strengths',
    'Include years of experience and main expertise',
    'Avoid using "I" or "me" - write in third person'
  ],
  skills: [
    'List 8-12 relevant skills for your target role',
    'Include both technical and soft skills',
    'Prioritize skills mentioned in job descriptions'
  ],
  experience: [
    'Use action verbs: Led, Developed, Managed, Increased',
    'Quantify achievements with numbers and percentages',
    'Focus on impact and results, not just responsibilities'
  ],
  education: [
    'List most recent education first',
    'Include GPA if above 3.5',
    'Add relevant coursework for entry-level positions'
  ],
  projects: [
    'Describe the problem you solved',
    'Mention technologies and tools used',
    'Highlight measurable outcomes or impact'
  ]
};

const ResumeTips = ({ section }) => {
  const sectionTips = tips[section] || [];

  if (sectionTips.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-2">
        <FiInfo className="text-blue-600 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-blue-900 mb-2">💡 Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {sectionTips.map((tip, idx) => (
              <li key={idx}>• {tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeTips;
