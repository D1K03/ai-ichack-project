import React, { useState } from "react";
import "./debugger.css";
import axios from "axios";

const Debugger = () => {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/debug", { code });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error("Error during debugging:", error);
      setAnalysis("An error occurred while analyzing your code.");
    }
    setLoading(false);
  };

  return (
    <div className="debugger-container">
      {/* Left Panel */}
      <div className="code-panel">
        <h2>Enter Your Code</h2>
        <textarea
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="debug-button"
          onClick={handleDebug}
          disabled={loading}
        >
          {loading ? "Analysing" : "Analyse Code"}
        </button>
      </div>

      {/* Right Panel */}
      <div className="analysis-panel">
        <h2>Analysis</h2>
        {loading ? (
          <p>Analysing</p>
        ) : (
          <pre className="analysis-output">{analysis}</pre>
        )}
      </div>
    </div>
  );
};

export default Debugger;
