import React, { useState, useEffect } from "react";
import ScheduledApptBox from "./ScheduledApptBox";
import NewApptDialog from "./NewApptDialog";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import Card from '@material-ui/core/Card';
import TableHead from '@material-ui/core/TableHead';

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
                <div style={{display: 'flex', justifyContent: "center"}}>
                <Table style={{width:650}}>
                    <Card style={{marginTop:10}}>
                        <TableHead style={{display:'flex', justifyContent:'space-between'}}>
                            <TableCell>Time</TableCell>
                            <TableCell>Dog Name</TableCell>
                            <TableCell>Dog Type</TableCell>
                            <TableCell>Bather</TableCell>
                            <TableCell>Groomer</TableCell>
                            <TableCell><Button variant="contained" color="primary">Action</Button></TableCell>
                        </TableHead>
                    </Card>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:"center"}}>
                        {appointments.map((a) => {
                            return (
                                <ScheduledApptBox scheduled={a}/> 
                            )
                        })}
                    </div>
                </Table>
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