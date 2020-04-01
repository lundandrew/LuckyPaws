import React, { useState, useEffect } from "react";
import ScheduledApptBox from "./ScheduledApptBox";
import NewApptDialog from "./NewApptDialog";

import {
Paper,
Typography,
Button,
}
from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function Scheduled(props) {
    const [newApptOpen, setNewApptOpen] = useState(false);

    return(
        <div style={{display:'flex', justifyContent:"center"}}>
            <Paper variant="outlined" style={{width:800, marginTop:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h3"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        Today's Schedule:
                </Typography>
                <div style={{display: 'flex', justifyContent:"center"}}>
                    <ScheduledApptBox />
                </div>
                <NewApptDialog open={newApptOpen} onClose={() => {setNewApptOpen(false)}}/>
                <div style={{marginTop:30, padding:10, display:'flex', justifyContent:"center"}}>
                    <Button variant="contained" color="secondary" onClick={() => {setNewApptOpen(true)}}>
                        <AddCircleOutlineIcon style={{marginRight:20}}/>
                        New Appointment
                    </Button>
                </div>
            </Paper>            
        </div>
    )
}