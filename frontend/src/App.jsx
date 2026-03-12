import { useState } from 'react';
import ResumeBuilder from './pages/ResumeBuilder';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <ResumeBuilder />
    </div>
  );
}

export default App;
