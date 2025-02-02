import React from 'react';
import "./App.css";
import Debugger from './Debugger';

function App() {
  return (
    <div className="App">
      <h1>Code Reviewer</h1>
      <h3>Providing an insightful review to the code you provide us with tips on how to spot those sneaky errors</h3>
      <Debugger />
    </div>
  );
}

export default App;
