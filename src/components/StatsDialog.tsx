import * as React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {calcStats} from "../utils/stats";
import {EventRecord} from "../types/EventRecord";
import {useEffect, useState} from "react";
import EventStats from "../types/EventStats";
import {msToTime} from "../utils/helpers";


interface AppProps {
    records: EventRecord[]
    open: boolean
    handleClose: () => void
}


function StatsDialog({records, open, handleClose }: AppProps) {

    const [stats, setStats] = useState<EventStats | null>(null);

    useEffect(() => {
        if(!open) {
            setStats(null);
            return;
        }

        const eventsStats = calcStats([...records]);
        setStats(eventsStats);

    }, [open, records]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
                <DialogTitle>Stats</DialogTitle>
                <DialogContent>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {!stats && <CircularProgress style={{margin: 'auto'}} />}
                        {stats &&
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    Counts of different event types:
                                </Grid>
                                <Grid item xs={4}>
                                    {stats.eventsCount}
                                </Grid>

                                <Grid item xs={8}>
                                    Min time delay between events:
                                </Grid>
                                <Grid item xs={4}>
                                    {msToTime(stats.minTime)}
                                </Grid>

                                <Grid item xs={8}>
                                    Max time delay between events:
                                </Grid>
                                <Grid item xs={4}>
                                    {msToTime(stats.maxTime)}
                                </Grid>

                                <Grid item xs={8}>
                                    Mean time delay between events:
                                </Grid>
                                <Grid item xs={4}>
                                    {msToTime(stats.avgTime)}
                                </Grid>

                                <Grid item xs={8}>
                                    Length of the longest sequence of following input events:
                                </Grid>
                                <Grid item xs={4}>
                                    {stats.longestSequenceCount} ({stats.longestSequenceName})
                                </Grid>

                                <Grid item xs={8}>
                                    Total time of the events:
                                </Grid>
                                <Grid item xs={4}>
                                    {msToTime(stats.totalTime)}
                                </Grid>
                            </Grid>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default StatsDialog;