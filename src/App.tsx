import React, {useState} from 'react';
import './App.css';
import RecordList from "./components/RecordList";

import data from './data/task.recording.json';
import {Record} from "./types/Record";

function App() {

    const [records, setRecords] = useState<Record[]>(data.records || []);

    const updateRecords = (records: Record[]) => {
        setRecords([...records])
    }

    return (
        <div className="App">
            <RecordList records={records} updateRecords={updateRecords}></RecordList>
        </div>
    );
}

export default App;
