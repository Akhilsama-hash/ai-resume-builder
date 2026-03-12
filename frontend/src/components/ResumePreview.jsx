import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const ResumePreview = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div id="resume-preview" className="bg-white p-8 shadow-lg" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
