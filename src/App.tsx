import React, {useEffect, useState} from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import {EventRecord} from "./types/EventRecord";
import {SERVER_URL} from "./config";
import RecordList from "./components/RecordList";
import Message from "./components/Message";

function App() {

    const [records, setRecords] = useState<EventRecord[] | null>(null);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {

        async function fetchData() {

            try {
                const res = await axios.get(SERVER_URL);
                setRecords(res.data.records as EventRecord[])
            } catch (e) {
                console.log(e);
                setMessage("Couldn't fetch data from server");
                setMessageOpen(true);
            }

        }

        fetchData();

    }, [])

    const updateRecords = (records: EventRecord[]) => {
        setRecords([...records])
    }

    return (
        <div className="App">
            <Message open={messageOpen} message={message} handleClose={() => setMessageOpen(false)} severity="error" />
            {!records &&
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    <CircularProgress style={{margin: 'auto'}} />
                </Box>
            }
            {records &&
                <RecordList records={records || []} updateRecords={updateRecords} />
            }
        </div>
    );
}

export default App;
