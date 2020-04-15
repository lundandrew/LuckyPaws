import React, { useState, useEffect } from "react";
import ScheduledApptBox from "./ScheduledApptBox";
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
import { db, snapshotToArray } from "./firebase";
import ApptBox from "./ApptBox"
import Completed from "./Completed"

export default function GroomerSchedule(props) {
    const [scheduled, setScheduled] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [completedAppt, setCompletedAppt] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('appointments').where("status","==","pending").onSnapshot((snapshot) => {
            const updated_scheduled = snapshotToArray(snapshot)
            setScheduled(updated_scheduled)
        })
        return unsubscribe
    }, [props])

    useEffect(() => {
        const unsubscribe = db.collection('appointments').where("status","==","checkedin").onSnapshot((snapshot) => {
            const updated_appointments = snapshotToArray(snapshot)
            setAppointments(updated_appointments)
        })
        return unsubscribe
    }, [props])

    useEffect(() => {
        const unsubscribe = db.collection('appointments').where("status","==","complete").onSnapshot((snapshot) => {
            const updated_complete = snapshotToArray(snapshot)
            setCompletedAppt(updated_complete)
        })
        return unsubscribe
    }, [props])

    return(
        <div style={{display:'flex', justifyContent:"center", flexDirection:"column"}}>
        <div style={{display:'flex', justifyContent:"center"}}>
            <Paper variant="outlined" style={{width:800, marginTop:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h4"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        My Assignments:
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
                        {scheduled.map((a) => {
                            return (
                                <ScheduledApptBox scheduled={a}/> 
                            )
                        })}
                    </div>
                </Table>
                </div>
            </Paper>            
        </div>
        <div style={{display:'flex', justifyContent:"center"}}>
            <Paper variant="outlined" style={{width:1000, marginTop:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h4"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        Checked-in:
                </Typography>
                <div style={{display: 'flex', justifyContent: "center"}}>
                <Table style={{width:900}}>
                    <Card style={{marginTop:10}}>
                        <TableHead style={{display:'flex', justifyContent:'space-between'}}>
                            <TableCell>Checked-In Time</TableCell>
                            <TableCell>Dog Name</TableCell>
                            <TableCell>Dog Type</TableCell>
                            <TableCell>Bather</TableCell>
                            <TableCell>Groomer</TableCell>
                            <TableCell>Groom Notes</TableCell>
                            <TableCell>Out Time</TableCell>
                            <TableCell>Quote</TableCell>
                            <TableCell><Button variant="contained" color="primary">Action</Button></TableCell>
                        </TableHead>
                    </Card>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:"center"}}>
                        {appointments.map((a) => {
                            return (
                                <ApptBox appointments={a}/> 
                            )
                        })}
                    </div>
                </Table>
                </div>
            </Paper>
        </div>
        <div style={{display:'flex', justifyContent:"center"}}>
            <Paper variant="outlined" style={{width:1000, marginTop:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h4"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        Completed:
                </Typography>
                <div style={{display: 'flex', justifyContent: "center"}}>
                <Table style={{width:900}}>
                    <Card style={{marginTop:10}}>
                        <TableHead style={{display:'flex', justifyContent:'space-between'}}>
                            <TableCell>Time</TableCell>
                            <TableCell>Dog Name</TableCell>
                            <TableCell>Dog Type</TableCell>
                            <TableCell>Bather</TableCell>
                            <TableCell>Groomer</TableCell>
                            <TableCell>Groom Notes</TableCell>
                            <TableCell>Out Time</TableCell>
                            <TableCell>Quote</TableCell>
                            <TableCell><Button variant="contained" color="primary">Action</Button></TableCell>
                        </TableHead>
                    </Card>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:"center"}}>
                        {completedAppt.map((a) => {
                            return (
                                <Completed completed={a}/> 
                            )
                        })}
                    </div>
                </Table>
                </div>
            </Paper>
        </div>
        </div>
    )
}