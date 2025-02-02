import React, { useState } from 'react';
import axios from 'axios';
import './Debugger.css'; // Import the CSS

const Debugger = () => {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/debug', { code });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error during debugging:', error);
      setAnalysis('An error occurred while analyzing your code.');
    }
    setLoading(false);
  };

  return (
    <div className="debugger-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2 className="panel-title">Enter Your Code</h2>
        <textarea
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type your code here..."
        />
        <button
          className="analyze-button"
          onClick={handleDebug}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h2 className="panel-title">Analysis</h2>
        {loading ? (
          <p className="loading-text">Loading analysis...</p>
        ) : (
          <pre className="analysis-output">{analysis}</pre>
        )}
      </div>
    </div>
  );
};

export default Debugger;
