const ClassicTemplate = ({ data }) => {
  return (
    <div className="font-serif text-gray-900">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {data.name || 'YOUR NAME'}
        </h1>
        <div className="text-sm text-gray-700 space-x-3">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>•</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed text-justify">
            {data.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-800">
                • {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {exp.company}
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            PROJECTS
          </h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <div className="text-xs text-gray-600 italic mb-1">
                  {project.technologies}
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {project.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.year}</span>
                </div>
                <div className="text-sm text-gray-700">
                  {edu.institution}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
