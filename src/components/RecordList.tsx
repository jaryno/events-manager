import {Record} from "../types/Record";

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {TableBody} from "@mui/material";
import {formatTimestamp} from "../utils/time";


interface AppProps {
    records: Record[]
}

const renderRows = (records: Record[]) => records.map((record, index) =>
    <TableRow key={index}>
        <TableCell>{record.event?.type || ""}</TableCell>
        <TableCell>{record.setup?.nodeName || ""}</TableCell>
        <TableCell>{formatTimestamp(record.time || 0)}</TableCell>
    </TableRow>
);

function RecordList({ records } : AppProps) {

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
                <TableBody>
                    {renderRows(records)}
                </TableBody>
            </Table>
        </div>
    )

}

export default RecordList;