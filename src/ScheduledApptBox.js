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
        <CheckInDialog open={checkInOpen} onClose={() => {setCheckInOpen(false)}}/>
        <Table style={{width:650}}>
            <Card style={{marginTop:10}}>
                <TableHead style={{display:'flex'}}>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Dog1</TableCell>
                    <TableCell align="right">DogType1</TableCell>
                    <TableCell align="right">Bather</TableCell>
                    <TableCell style={{display:'flex', flexGrow:1}}>Groomer</TableCell>
                    <TableCell align="right" onClick={() => {setCheckInOpen(true)}}><Button variant="contained" color="primary">Check-In</Button></TableCell>
                </TableHead>
            </Card>
            <Card style={{marginTop:10}}>
                <TableRow style={{display:'flex'}}>
                    <TableCell align="right">8:00</TableCell>
                    <TableCell align="right">Otto</TableCell>
                    <TableCell align="right">Golden Doodle</TableCell>
                    <TableCell align="right">Hannah</TableCell>
                    <TableCell style={{display:'flex', flexGrow:1}}>Sarah</TableCell>
                    <TableCell align="right"><Button variant="contained" color="primary">Check-In</Button></TableCell>
                </TableRow>
            </Card>
            <Card style={{marginTop:10}}>
                <TableRow style={{display:'flex'}}>
                    <TableCell align="right">10:00</TableCell>
                    <TableCell align="right">Saide</TableCell>
                    <TableCell align="right">Shih Tzu</TableCell>
                    <TableCell align="right">Rachel</TableCell>
                    <TableCell style={{display:'flex', flexGrow:1}}>Chad</TableCell>
                    <TableCell align="right"><Button variant="contained" color="primary">Check-In</Button></TableCell>
                </TableRow>
            </Card>
        </Table>
    </div>
    )
}