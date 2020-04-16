import React, { useState, useEffect } from "react";
import ScheduledApptBox from "./ScheduledApptBox";
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
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
            <Paper elevation={5} style={{width:800, marginTop:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h4"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        My Assignments:
                </Typography>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableCell align="center"><Typography variant="button">Time</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Dog Name</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Dog Type</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Bather</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Groomer</Typography></TableCell>
                        <TableCell align="right"><Typography variant="button">Action</Typography></TableCell>
                    </TableHead>
                    <TableBody>
                        {scheduled
                        .filter(groomer => {
                            return groomer.groomer === "Cheri"
                        })
                        .map((a) => {
                            return (
                                <ScheduledApptBox scheduled={a}/> 
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>            
        </div>
        <div style={{display:'flex', justifyContent:"center"}}>
            <Paper elevation={5} style={{width:1000, marginTop:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h4"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        Checked-in:
                </Typography>
                <Table>
                        <TableHead>
                            <TableCell align="center"><Typography variant="button">Time</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Dog Name</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Dog Type</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Bather</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Groomer</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Groom Notes</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Out Time</Typography></TableCell>
                            <TableCell align="center"><Typography variant="button">Quote</Typography></TableCell>
                            <TableCell align="center"><Typography variant ="button">Bathed?</Typography></TableCell>
                            <TableCell align="right"><Typography variant="button">Action</Typography></TableCell>
                        </TableHead>
                        <TableBody>
                            {appointments.map((a) => {
                                return (
                                    <ApptBox appointments={a}/> 
                                )
                            })}
                        </TableBody>
                </Table>
            </Paper>
        </div>
        <div style={{display:'flex', justifyContent:"center"}}>
            <Paper elevation={5} style={{width:1000, marginTop:"30px", marginBottom:"30px", display:'flex', flexDirection:"column", justifyContent:"center"}}>
                <Typography 
                    variant="h4"
                    color="inherit"
                    style={{display:'flex', justifyContent: "center", padding:10}}>
                        Completed:
                </Typography>
                <Table>
                    <TableHead>
                        <TableCell align="center"><Typography variant="button">Time</Typography>Time</TableCell>
                        <TableCell align="center"><Typography variant="button">Dog Name</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Dog Type</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Bather</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Groomer</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Groom Notes</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Out Time</Typography></TableCell>
                        <TableCell align="center"><Typography variant="button">Quote</Typography></TableCell>
                        <TableCell align="right"><Typography variant="button">Action</Typography></TableCell>
                    </TableHead>
                    <TableBody>
                        {completedAppt.map((a) => {
                            return (
                                <Completed completed={a}/> 
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
        </div>
    )
}