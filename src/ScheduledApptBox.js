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
    <div>
        <CheckInDialog appointments={props.appointments} open={checkInOpen} onClose={() => {setCheckInOpen(false)}}/>
            <Card style={{marginTop:10}}>
                <TableRow style={{display:'flex', justifyContent:'space-between'}}>
                    <TableCell >{props.appointments.time}</TableCell>
                    <TableCell >{props.appointments.dogName}</TableCell>
                    <TableCell >{props.appointments.dogType}</TableCell>
                    <TableCell >Hannah</TableCell>
                    <TableCell >Sarah</TableCell>
                    <TableCell  onClick={() => {setCheckInOpen(true)}}><Button variant="contained" color="primary">Check-In</Button></TableCell>
                </TableRow>
            </Card>
    </div>
    )
}