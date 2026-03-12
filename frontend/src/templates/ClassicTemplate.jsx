const ClassicTemplate = ({ data }) => {
  return (
    <div className="font-serif text-gray-900" style={{ fontSize: '10px', lineHeight: '1.3' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-2 mb-3">
        <h1 className="font-bold mb-1" style={{ fontSize: '20px' }}>
          {data.name || 'YOUR NAME'}
        </h1>
        <div className="text-gray-700 space-x-2" style={{ fontSize: '9px' }}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>•</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-3">
          <h2 className="font-bold text-gray-900 mb-1 border-b border-gray-400 pb-0.5" style={{ fontSize: '12px' }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-800 text-justify" style={{ fontSize: '9px' }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold text-gray-900 mb-1 border-b border-gray-400 pb-0.5" style={{ fontSize: '12px' }}>
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-3 gap-1">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-800" style={{ fontSize: '9px' }}>
                • {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold text-gray-900 mb-1 border-b border-gray-400 pb-0.5" style={{ fontSize: '12px' }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-2">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-gray-900" style={{ fontSize: '11px' }}>{exp.title}</h3>
                  <span className="text-gray-600" style={{ fontSize: '8px' }}>{exp.duration}</span>
                </div>
                <div className="font-semibold text-gray-700 mb-0.5" style={{ fontSize: '9px' }}>
                  {exp.company}
                </div>
                <p className="text-gray-800" style={{ fontSize: '9px' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold text-gray-900 mb-1 border-b border-gray-400 pb-0.5" style={{ fontSize: '12px' }}>
            PROJECTS
          </h2>
          <div className="space-y-2">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900" style={{ fontSize: '11px' }}>{project.name}</h3>
                <div className="text-gray-600 italic mb-0.5" style={{ fontSize: '8px' }}>
                  {project.technologies}
                </div>
                <p className="text-gray-800" style={{ fontSize: '9px' }}>
                  {project.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-2">
          <h2 className="font-bold text-gray-900 mb-1 border-b border-gray-400 pb-0.5" style={{ fontSize: '12px' }}>
            EDUCATION
          </h2>
          <div className="space-y-1">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900" style={{ fontSize: '11px' }}>{edu.degree}</h3>
                  <span className="text-gray-600" style={{ fontSize: '8px' }}>{edu.year}</span>
                </div>
                <div className="text-gray-700" style={{ fontSize: '9px' }}>
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
