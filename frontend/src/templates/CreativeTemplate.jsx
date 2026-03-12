const CreativeTemplate = ({ data }) => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6 -mx-8 -mt-8">
        <h1 className="text-4xl font-bold mb-3">
          {data.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.email && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded">📧</span>
              {data.email}
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded">📱</span>
              {data.phone}
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded">📍</span>
              {data.location}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
          </div>
          <p className="text-gray-700 leading-relaxed pl-5">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2 pl-5">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold border border-purple-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
          </div>
          <div className="space-y-4 pl-5">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-purple-200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                <div className="text-purple-600 font-semibold">{exp.company}</div>
                <div className="text-sm text-gray-500 mb-2">{exp.duration}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          </div>
          <div className="space-y-4 pl-5">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                <div className="text-sm text-purple-600 font-medium mb-2">
                  {project.technologies}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{project.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          </div>
          <div className="space-y-3 pl-5">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-purple-300 pl-4">
                <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                <div className="text-purple-600 font-medium">{edu.institution}</div>
                <div className="text-sm text-gray-600">
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
