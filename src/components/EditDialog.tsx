import Button from '@mui/material/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {useEffect, useState} from "react";
import {EventRecordToEdit} from "../types/EventRecord";
import JSONEdit from "./JSONEdit";

interface AppProps {
    open: boolean
    data: EventRecordToEdit
    handleSave: (record: EventRecordToEdit) => void
    handleClose: () => void
}

function EditDialog({data, open, handleClose, handleSave}: AppProps) {
    const [recordToEdit, setRecordToEdit] = useState(data);

    useEffect(() => {
        setRecordToEdit(data);
    }, [data])

    const onChangeJSON = (record: any) => {
        setRecordToEdit({ index: recordToEdit.index, record });
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <JSONEdit data={recordToEdit} onChangeJSON={onChangeJSON}></JSONEdit>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleSave(recordToEdit)} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditDialog;