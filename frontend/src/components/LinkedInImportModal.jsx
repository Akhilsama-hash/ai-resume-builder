import { useState } from 'react';
import { FiLinkedin, FiX, FiUpload } from 'react-icons/fi';

const LinkedInImportModal = ({ onClose, onApplyData }) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    if (!linkedinUrl.trim()) {
      alert('Please enter a LinkedIn profile URL');
      return;
    }

    setImporting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://ai-resume-builder-wj81.onrender.com';
      const response = await fetch(`${API_URL}/api/linkedin-import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkedinUrl })
      });

      const data = await response.json();
      if (data.success) {
        onApplyData(data.resumeData);
        onClose();
      } else {
        alert(data.message || 'Failed to import LinkedIn profile');
      }
    } catch (error) {
      console.error('Error importing LinkedIn:', error);
      alert('Failed to import. Please try manual entry.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <FiLinkedin />
                Import from LinkedIn
              </h2>
              <p className="text-sm opacity-90">
                Paste your LinkedIn profile URL
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2">
              <FiX size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              📌 Example: https://www.linkedin.com/in/yourprofile
            </p>
          </div>

          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://www.linkedin.com/in/yourprofile"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={handleImport}
            disabled={importing}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiUpload />
            {importing ? 'Importing...' : 'Import Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInImportModal;
