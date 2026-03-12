import { useState } from 'react';
import { FiMail, FiX, FiSend } from 'react-icons/fi';

const EmailResumeModal = ({ onClose, resumeData }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      alert('Please enter an email address');
      return;
    }

    setSending(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://ai-resume-builder-wj81.onrender.com';
      const response = await fetch(`${API_URL}/api/email-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message, resumeData })
      });

      const data = await response.json();
      if (data.success) {
        alert('Resume sent successfully!');
        onClose();
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <FiMail />
                Email Resume
              </h2>
              <p className="text-sm opacity-90">Send your resume directly</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2">
              <FiX size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recruiter@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={sending}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiSend />
            {sending ? 'Sending...' : 'Send Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailResumeModal;
