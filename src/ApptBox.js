import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckInDialog from "./CheckInDialog";
import DoneDialog from "./DoneDialog"
export default function ApptBox(props) {
    const [checkInOpen, setCheckInOpen] = useState(false);

    return(
    <div>
        <DoneDialog appointments={props.appointments} open={checkInOpen} onClose={() => {setCheckInOpen(false)}}/>
            <Card style={{marginTop:10}}>
                <TableRow style={{display:'flex', justifyContent:'space-between'}}>
                    <TableCell >{props.appointments.time}</TableCell>
                    <TableCell >{props.appointments.dogName}</TableCell>
                    <TableCell >{props.appointments.dogType}</TableCell>
                    <TableCell >{props.appointments.bather}</TableCell>
                    <TableCell >{props.appointments.groomer}</TableCell>
                    <TableCell >{props.appointments.groomNotes}</TableCell>
                    <TableCell >{props.appointments.pickup}</TableCell>
                    <TableCell >{props.appointments.quote}</TableCell>
                    <TableCell  onClick={() => {setCheckInOpen(true)}}><Button variant="contained" color="primary">Done!</Button></TableCell>
                </TableRow>
            </Card>
    </div>
    )
}