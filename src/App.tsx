import React, {useState} from 'react';
import './App.css';
import RecordList from "./components/RecordList";

import data from './data/task.recording.json';
import {EventRecord} from "./types/EventRecord";

function App() {

    const [records, setRecords] = useState<EventRecord[]>(data.records || []);

    const updateRecords = (records: EventRecord[]) => {
        setRecords([...records])
    }

    return (
        <div className="App">
            <RecordList records={records} updateRecords={updateRecords}></RecordList>
        </div>
    );
}

export default App;
