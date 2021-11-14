import React from 'react';
import './App.css';
import RecordList from "./components/RecordList";

import data from './data/task.recording.json';

function App() {
  return (
    <div className="App">
      <RecordList records={data.records || []}></RecordList>
    </div>
  );
}

export default App;
