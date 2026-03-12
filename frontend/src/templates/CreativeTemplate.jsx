const CreativeTemplate = ({ data }) => {
  return (
    <div className="font-sans text-gray-800" style={{ fontSize: '10px', lineHeight: '1.3' }}>
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg mb-3 -mx-8 -mt-8">
        <h1 className="font-bold mb-1" style={{ fontSize: '20px' }}>
          {data.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-2" style={{ fontSize: '9px' }}>
          {data.email && (
            <div className="flex items-center gap-1">
              <span className="bg-white/20 px-1 py-0.5 rounded">📧</span>
              {data.email}
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <span className="bg-white/20 px-1 py-0.5 rounded">📱</span>
              {data.phone}
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1">
              <span className="bg-white/20 px-1 py-0.5 rounded">📍</span>
              {data.location}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="font-bold text-gray-900" style={{ fontSize: '12px' }}>About Me</h2>
          </div>
          <p className="text-gray-700 pl-3" style={{ fontSize: '9px' }}>{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="font-bold text-gray-900" style={{ fontSize: '12px' }}>Skills</h2>
          </div>
          <div className="flex flex-wrap gap-1 pl-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-2 py-0.5 rounded-lg font-semibold border border-purple-200"
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
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="font-bold text-gray-900" style={{ fontSize: '12px' }}>Experience</h2>
          </div>
          <div className="space-y-2 pl-3">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-3 border-l-2 border-purple-200">
                <div className="absolute -left-1 top-0 w-2 h-2 bg-purple-600 rounded-full"></div>
                <h3 className="font-bold text-gray-900" style={{ fontSize: '11px' }}>{exp.title}</h3>
                <div className="text-purple-600 font-semibold" style={{ fontSize: '9px' }}>{exp.company}</div>
                <div className="text-gray-500 mb-0.5" style={{ fontSize: '8px' }}>{exp.duration}</div>
                <p className="text-gray-700" style={{ fontSize: '9px' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="font-bold text-gray-900" style={{ fontSize: '12px' }}>Projects</h2>
          </div>
          <div className="space-y-2 pl-3">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-0.5" style={{ fontSize: '11px' }}>{project.name}</h3>
                <div className="text-purple-600 font-medium mb-0.5" style={{ fontSize: '8px' }}>
                  {project.technologies}
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
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="font-bold text-gray-900" style={{ fontSize: '12px' }}>Education</h2>
          </div>
          <div className="space-y-2 pl-3">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-purple-300 pl-2">
                <h3 className="font-bold text-gray-900" style={{ fontSize: '11px' }}>{edu.degree}</h3>
                <div className="text-purple-600 font-medium" style={{ fontSize: '9px' }}>{edu.institution}</div>
                <div className="text-gray-600" style={{ fontSize: '8px' }}>
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

export default CreativeTemplate;
