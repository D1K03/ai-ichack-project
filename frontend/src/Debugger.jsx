import React, { useState } from "react";
import "./debugger.css";
import axios from "axios";

const Debugger = () => {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableTTS, setEnableTTS] = useState(false);

  const handleDebug = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/debug", { code });
      setAnalysis(response.data.analysis);

      if (enableTTS) {
        handleNativeTTS(response.data.analysis);
      }
    } catch (error) {
      console.error("Error during debugging:", error);
      setAnalysis("An error occurred while analyzing your code.");
    }
    setLoading(false);
  };

  const handleNativeTTS = (text) => {
    if (!text) {
      alert("No analysis to read!");
      return;
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="debugger-container">
      <div className="code-panel">
        <h2>Enter Your Code</h2>
        <textarea
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="action-row">
          <button
            className="debug-button"
            onClick={handleDebug}
            disabled={loading}
          >
            {loading ? "Analysing" : "Analyse Code"}
          </button>
          <label className="tts-checkbox">
            <input
              type="checkbox"
              checked={enableTTS}
              onChange={(e) => setEnableTTS(e.target.checked)}
            />
            Enable TTS
          </label>
        </div>
      </div>

      <div className="analysis-panel">
        <h2>Breakdown</h2>
        <pre className="analysis-output">{analysis}</pre>
      </div>
    </div>
  );
};

export default Debugger;
