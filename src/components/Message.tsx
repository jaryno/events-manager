import Snackbar from "@mui/material/Snackbar";
import Alert, {AlertColor} from "@mui/material/Alert";
import React from "react";

interface AppProps {
    open: boolean
    message: string,
    handleClose: () => void
    severity?: AlertColor
}

function Message ({ open, message, handleClose, severity }: AppProps) {
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert severity={severity || "success"}>{message}</Alert>
            </Snackbar>

        </>
    )
}
export default Message;