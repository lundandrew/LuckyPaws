import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import CheckInDialog from "./CheckInDialog";

export default function ScheduledApptBox(props) {
    const [checkInOpen, setCheckInOpen] = useState(false);

    return(
        <TableRow>
            <TableCell align="center" component="th" scope="row">{props.scheduled.time}</TableCell>
            <TableCell align="center">{props.scheduled.dogName}</TableCell>
            <TableCell align="center">{props.scheduled.dogType}</TableCell>
            <TableCell align="center">{props.scheduled.bather}</TableCell>
            <TableCell align="center">{props.scheduled.groomer}</TableCell>
            <TableCell align="right" onClick={() => {setCheckInOpen(true)}}><Button variant="contained" color="primary">Check-In</Button></TableCell>
            <CheckInDialog style={{marginTop:10}} scheduled={props.scheduled} open={checkInOpen} onClose={() => {setCheckInOpen(false)}}/>
        </TableRow>

    )
}