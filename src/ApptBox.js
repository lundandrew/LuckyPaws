import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckInDialog from "./CheckInDialog";
import DoneDialog from "./DoneDialog"
import Checkbox from '@material-ui/core/Checkbox';
export default function ApptBox(props) {
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checked, setChecked] = useState (false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }
    return(
       
                <TableRow>
                    <TableCell align="center" component="th" scope="row">{props.appointments.time}</TableCell>
                    <TableCell align="center">{props.appointments.dogName}</TableCell>
                    <TableCell align="center">{props.appointments.dogType}</TableCell>
                    <TableCell align="center">{props.appointments.bather}</TableCell>
                    <TableCell align="center">{props.appointments.groomer}</TableCell>
                    <TableCell align="center">{props.appointments.groomNotes}</TableCell>
                    <TableCell align="center">{props.appointments.pickup}</TableCell>
                    <TableCell align="center">{props.appointments.quote}</TableCell>
                    <TableCell align="center" padding="checkbox">
                        <Checkbox   
                            checked={checked}
                            onChange={handleChange}
                        />
                    </TableCell>
                    <TableCell align="right" onClick={() => {setCheckInOpen(true)}}><Button variant="contained" color="primary">Done!</Button></TableCell>
                    <DoneDialog appointments={props.appointments} open={checkInOpen} onClose={() => {setCheckInOpen(false)}}/>
                </TableRow>
    )
}