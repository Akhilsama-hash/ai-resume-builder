import { useState } from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const GrammarCheck = ({ text, onFix }) => {
  const [checking, setChecking] = useState(false);
  const [issues, setIssues] = useState([]);

  const checkGrammar = async () => {
    setChecking(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://ai-resume-builder-wj81.onrender.com';
      const response = await fetch(`${API_URL}/api/grammar-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      if (data.success) {
        setIssues(data.issues);
        if (data.correctedText) {
          onFix(data.correctedText);
        }
      }
    } catch (error) {
      console.error('Grammar check failed:', error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <button
      onClick={checkGrammar}
      disabled={checking || !text}
      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 disabled:opacity-50"
    >
      {checking ? (
        <>Checking...</>
      ) : issues.length === 0 ? (
        <><FiCheckCircle /> Check Grammar</>
      ) : (
        <><FiAlertCircle /> {issues.length} issues found</>
      )}
    </button>
  );
};

export default GrammarCheck;
