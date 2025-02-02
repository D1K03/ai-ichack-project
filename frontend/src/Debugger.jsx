import React, { useState } from "react";
import "./debugger.css";
import axios from "axios";

const Debugger = () => {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableTTS, setEnableTTS] = useState(false);
  const [showPlayTTSButton, setShowPlayTTSButton] = useState(false);

  const handleDebug = async () => {
    setLoading(true);
    setShowPlayTTSButton(false);
    try {
      const response = await axios.post("http://localhost:5000/debug", { code });
      const analysisText = response.data.analysis;
      setAnalysis(analysisText);

      setShowPlayTTSButton(true);
    } catch (error) {
      console.error("Error during debugging:", error);
      setAnalysis("An error occurred while analyzing your code.");
    }
    setLoading(false);
  };

  const handleBrowserTTS = (text) => {
    if (!text) {
      alert("No analysis to read!");
      return;
    }

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
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
          <button className="debug-button" onClick={handleDebug} disabled={loading}>
            {loading ? "Analysing" : "Analyse Code"}
          </button>
        </div>
      </div>
      <div className="analysis-panel">
        <h2>Breakdown</h2>
        <pre className="analysis-output">{analysis}</pre>

        {showPlayTTSButton && (
          <button
            className="tts-button"
            onClick={() => handleBrowserTTS(analysis)}
          >
            🔊 Play Analysis
          </button>
        )}
      </div>
    </div>
  );
};

export default Debugger;
