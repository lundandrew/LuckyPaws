import React, { useState, useEffect } from "react";
import {
    AppBar,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    TextField,
    Toolbar,
    Typography,
    Checkbox
  } from "@material-ui/core";
import { db, snapshotToArray } from "./firebase";

export default function Payroll(props) {

    const [appointments, setAppointments] = useState([]);

    const handleDeleteAppointments = () => {
        db.collection("appointments")
          .get()
          .then(res => {
              res.forEach(element => {
                element.ref.delete()
              })
          })
    }

    useEffect(() => {
        const unsubscribe = db.collection('appointments').where("status","==","payroll").onSnapshot((snapshot) => {
            const updated_appointments = snapshotToArray(snapshot)
            setAppointments(updated_appointments)
        })
        return unsubscribe
    }, [props])

    return(
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <Paper style={{ padding: "30px", width: "700px"}}>
                <Typography style={{display: 'flex', justifyContent: "center"}} variant="h6">Payroll Summary</Typography>
                <List>
                    {appointments.map((e) => {
                        return(
                            <ListItem>
                                <ListItemText>{"Dog Name: " + e.dogName}</ListItemText>
                                <ListItemText>{"Bather: " + e.bather}</ListItemText>
                                <ListItemText>{"Groomer: " + e.groomer}</ListItemText>
                                <ListItemText>{"Total Price: $" + e.totalPrice}</ListItemText>
                                <ListItemText>{"Tip: $" + e.tip}</ListItemText>
                            </ListItem>
                        )
                    })}
                </List>
                <Button variant="contained" color="secondary" onClick={handleDeleteAppointments}>Clear all Appointments</Button>
            </Paper>
        </div>
    )
}