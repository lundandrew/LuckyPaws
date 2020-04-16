import React, { useState, useEffect } from "react";
import ScheduledApptBox from "./ScheduledApptBox";
import NewApptDialog from "./NewApptDialog";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import Card from '@material-ui/core/Card';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';


import {
Paper,
Typography,
Button,
}
from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { db, snapshotToArray } from "./firebase";

export default function Scheduled(props) {
    const [newApptOpen, setNewApptOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('appointments').where("status","==","pending").onSnapshot((snapshot) => {
            const updated_appointments = snapshotToArray(snapshot)
            setAppointments(updated_appointments)
        })
        return unsubscribe
    }, [props])

    return(
        <div style={{display:'flex', justifyContent:"center"}}>
            <Paper variant="outlined" style={{width:800, marginTop:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h3"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        Today's Schedule:
                </Typography>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableCell align="center"><Typography variant="button">Time</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Dog Name</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Dog Type</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Bather</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Groomer</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Action</Typography></TableCell>
                        </TableHead>
                        <TableBody>
                            {appointments.map((a) => {
                                return (
                                    <ScheduledApptBox scheduled={a}/> 
                                )
                            })}
                        </TableBody>
                    </Table>
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