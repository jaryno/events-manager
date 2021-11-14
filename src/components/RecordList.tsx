import React, {useState} from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {TableBody} from "@mui/material";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {formatTimestamp} from "../utils/time";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from 'react-beautiful-dnd';

import {Record, RecordToEdit} from "../types/Record";
import EditDialog from "./EditDialog";
import Message from "./Message";
import {saveRecords} from "../utils/data";

interface AppProps {
    records: Record[],
    updateRecords: (records: Record[]) => void
}

type onEditRecord = (i: number, record: Record) => void;
type onRemoveRecord = (i: number) => void;

const renderRows = (records: Record[], onEdit: onEditRecord, onRemove: onRemoveRecord) =>
    records.map((record, i) => {
        return <Draggable
            draggableId={`${i}`}
            index={i}
            key={i}
        >
            {(provided, snapshot) => (
                <TableRow
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <TableCell>{record.event?.type || ""}</TableCell>
                    <TableCell>{record.setup?.nodeName || ""}</TableCell>
                    <TableCell>{formatTimestamp(record.time || 0)}</TableCell>
                    <TableCell><Button onClick={() => onEdit(i, record)} size="small">Edit</Button></TableCell>
                    <TableCell><Button onClick={() => onRemove(i)} size="small">Delete</Button></TableCell>
                </TableRow>
            )}
        </Draggable>
    }
);

function RecordList({ records, updateRecords } : AppProps) {

    const initialRecordToEdit = { index: -1, record: {} };

    const [recordToEdit, setRecordToEdit] = useState<RecordToEdit>(initialRecordToEdit);
    const [message, setMessage] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);

    const showMessage = (msg: string) => {
        setMessageOpen(false);
        setTimeout(() => {
            setMessage(msg);
            setMessageOpen(true);
        }, 100);
    }

    const handleCloseDialog = () => {
        setEditOpen(false);
        setRecordToEdit(initialRecordToEdit);
    }

    const handleCloseMessage = () => {
        setMessageOpen(false);
    }

    const onRecordEdit: onEditRecord = (index: number, record: Record) => {
        setRecordToEdit({ index, record });
        setEditOpen(true);
    }

    const onRecordUpdate = (recordToEdit: RecordToEdit) => {
        const { index, record } = recordToEdit;
        records[index] = record;
        updateRecords(records);
        handleCloseDialog();
        showMessage("Edited");
    }

    const onRecordRemove: onRemoveRecord = (i: number) => {
        records.splice(i, 1);
        updateRecords(records);
        showMessage("Removed");
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return
        }

        const newRecords = records.slice(0);
        const [removed] = newRecords.splice(result.source.index, 1);
        newRecords.splice(result.destination.index, 0, removed);
        updateRecords(newRecords);
    }

    return (
        <div style={{ marginTop: '70px' }}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Stack spacing={2} direction="row">
                        <Button color="inherit" onClick={() => saveRecords(records)} variant="outlined">Save</Button>
                        <Button color="inherit" onClick={() => {}} variant="outlined">Stats</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            </Box>

            <Message open={messageOpen} message={message} handleClose={handleCloseMessage} />
            <EditDialog
                data={recordToEdit}
                open={editOpen}
                handleSave={onRecordUpdate}
                handleClose={handleCloseDialog}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Event Type</TableCell>
                        <TableCell>HTML Tag Name</TableCell>
                        <TableCell>Date Time</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={'droppable-table'} direction="vertical">
                        {(provided, snapshot) => (
                            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                {renderRows(records, onRecordEdit, onRecordRemove)}
                            </TableBody>
                        )}
                    </Droppable>
                </DragDropContext>
            </Table>
        </div>
    )

}

export default RecordList;