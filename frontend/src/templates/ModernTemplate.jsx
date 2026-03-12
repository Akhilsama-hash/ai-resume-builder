const ModernTemplate = ({ data }) => {
  return (
    <div className="font-sans text-gray-800" style={{ fontSize: '10px', lineHeight: '1.3' }}>
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-2 mb-3">
        <h1 className="font-bold text-gray-900 mb-1" style={{ fontSize: '20px' }}>
          {data.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-gray-600" style={{ fontSize: '9px' }}>
          {data.email && <span>📧 {data.email}</span>}
          {data.phone && <span>📱 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-3">
          <h2 className="font-bold text-blue-600 mb-1 uppercase tracking-wide" style={{ fontSize: '12px' }}>
            Professional Summary
          </h2>
          <p className="text-gray-700" style={{ fontSize: '9px' }}>{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold text-blue-600 mb-1 uppercase tracking-wide" style={{ fontSize: '12px' }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium"
                style={{ fontSize: '8px' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold text-blue-600 mb-1 uppercase tracking-wide" style={{ fontSize: '12px' }}>
            Work Experience
          </h2>
          <div className="space-y-2">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-300 pl-2">
                <h3 className="font-semibold text-gray-900" style={{ fontSize: '11px' }}>{exp.title}</h3>
                <div className="text-gray-600 font-medium" style={{ fontSize: '9px' }}>{exp.company}</div>
                <div className="text-gray-500 mb-1" style={{ fontSize: '8px' }}>{exp.duration}</div>
                <p className="text-gray-700" style={{ fontSize: '9px' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold text-blue-600 mb-1 uppercase tracking-wide" style={{ fontSize: '12px' }}>
            Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-blue-300 pl-2">
                <h3 className="font-semibold text-gray-900" style={{ fontSize: '11px' }}>{project.name}</h3>
                <div className="text-gray-600 mb-0.5" style={{ fontSize: '8px' }}>
                  <span className="font-medium">Tech:</span> {project.technologies}
                </div>
                <p className="text-gray-700" style={{ fontSize: '9px' }}>{project.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-2">
          <h2 className="font-bold text-blue-600 mb-1 uppercase tracking-wide" style={{ fontSize: '12px' }}>
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900" style={{ fontSize: '11px' }}>{edu.degree}</h3>
                <div className="text-gray-600" style={{ fontSize: '9px' }}>{edu.institution}</div>
                <div className="text-gray-500" style={{ fontSize: '8px' }}>
                  {edu.year}
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

export default ModernTemplate;
