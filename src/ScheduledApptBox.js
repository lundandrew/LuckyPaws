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
                <TableHead style={{display:'flex', justifyContent:'space-between'}}>
                    <TableCell>Time</TableCell>
                    <TableCell>Dog Name</TableCell>
                    <TableCell>Dog Type</TableCell>
                    <TableCell>Bather</TableCell>
                    <TableCell>Groomer</TableCell>
                    <TableCell><Button variant="contained" color="primary">Action</Button></TableCell>
                </TableHead>
            </Card>
            <Card style={{marginTop:10}}>
                <TableRow style={{display:'flex', justifyContent:'space-between'}}>
                    <TableCell >8:00</TableCell>
                    <TableCell >Otto</TableCell>
                    <TableCell >Golden Doodle</TableCell>
                    <TableCell >Hannah</TableCell>
                    <TableCell >Sarah</TableCell>
                    <TableCell  onClick={() => {setCheckInOpen(true)}}><Button variant="contained" color="primary">Check-In</Button></TableCell>
                </TableRow>
            </Card>
            <Card style={{marginTop:10}}>
                <TableRow style={{display:'flex', justifyContent:'space-between'}}>
                    <TableCell>10:00</TableCell>
                    <TableCell>Saide</TableCell>
                    <TableCell>Shih Tzu</TableCell>
                    <TableCell>Rachel</TableCell>
                    <TableCell>Chad</TableCell>
                    <TableCell onClick={() => {setCheckInOpen(true)}}><Button variant="contained" color="primary">Check-In</Button></TableCell>
                </TableRow>
            </Card>
        </Table>
    </div>
    )
}