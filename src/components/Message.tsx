import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from "react";

interface AppProps {
    open: boolean
    message: string,
    handleClose: () => void
}

function Message ({ open, message, handleClose }: AppProps) {
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="success">{message}</Alert>
            </Snackbar>

        </>
    )
}
export default Message;