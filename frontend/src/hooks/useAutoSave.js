import { useEffect, useState } from 'react';

export const useAutoSave = (data, key = 'resume-autosave', delay = 30000) => {
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data && (data.name || data.email)) {
        setIsSaving(true);
        localStorage.setItem(key, JSON.stringify(data));
        setLastSaved(new Date());
        setTimeout(() => setIsSaving(false), 500);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [data, key, delay]);

  const loadSaved = () => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  };

  const clearSaved = () => {
    localStorage.removeItem(key);
    setLastSaved(null);
  };

  return { lastSaved, isSaving, loadSaved, clearSaved };
};
