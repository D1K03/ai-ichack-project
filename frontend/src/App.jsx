import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis('');
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing code:', error);
      setAnalysis('Error analyzing code. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>AI Code Debugger</h1>
      <textarea
    rows="10"
        cols="50"
        placeholder= "Enter Your Code For Insightful Analysis"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Check for Errors'}
      </button>
      <div className="analysis">
        <h2>Analysis:</h2>
        <p>{analysis}</p>
      </div>
    </div>
  );
}

export default App;
