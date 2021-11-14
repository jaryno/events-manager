import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {TableBody} from "@mui/material";
import {formatTimestamp} from "../utils/time";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from 'react-beautiful-dnd';

import {Record} from "../types/Record";

interface AppProps {
    records: Record[],
    updateRecords: (records: Record[]) => void
}

const renderRows = (records: Record[]) =>
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
                </TableRow>
            )}
        </Draggable>
    }
);

function RecordList({ records, updateRecords } : AppProps) {

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
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Event Type</TableCell>
                        <TableCell>HTML Tag Name</TableCell>
                        <TableCell>Date Time</TableCell>
                    </TableRow>
                </TableHead>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={'droppable-table'} direction="vertical">
                        {(provided, snapshot) => (
                            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                {renderRows(records)}
                            </TableBody>
                        )}
                    </Droppable>
                </DragDropContext>
            </Table>
        </div>
    )

}

export default RecordList;