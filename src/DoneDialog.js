import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { db, snapshotToArray } from "./firebase";

export default function Done (props) {
  const [bather, setBather] = useState("")
  const [groomer, setGroomer] = useState("")
  const [groomNotes, setGroomNotes] = useState("")
  const [quote, setQuote] = useState("")
  const [pickup, setPickup] = useState("")
  const [employees, setEmployees] = useState([]);

  const handleSaveAppointment = () => {
    db.collection("appointments")
      .doc(props.appointments.id)
      .update(
        {groomNotes: groomNotes,
        quote: quote,
        pickup: pickup,
        status: "complete"
        }).then(() => {
          props.onClose();
        })
  }
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const updated_employees = snapshotToArray(snapshot);
      setEmployees(updated_employees);
    });
    return unsubscribe;
  }, [props]);

  
    return(
        <Dialog open={props.open} onClose = {props.onClose} maxWidth="xs">
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scheduled Time"
            type="text"
            fullWidth
            defaultValue={props.appointments.time}
          />
          <TextField
            margin="dense"
            id="name"
            label="Dog Name"
            type="text"
            fullWidth
            defaultValue={props.appointments.dogName}
          />
          <TextField
            margin="dense"
            id="name"
            label="Dog Type"
            type="text"
            fullWidth
            defaultValue={props.appointments.dogType}
          />
          <FormControl>
            <InputLabel>Bather</InputLabel>
            <Select
              style={{ width: 390 }}
              onChange={(e) => {
                setBather(e.target.value);
              }}
              defaultValue={props.appointments.bather}
            >
              {employees.map((e) => {
                return (
                  <MenuItem employees={e} value={e.firstName}>
                    {" "}
                    {e.firstName + " " + e.lastName}{" "}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Groomer</InputLabel>
            <Select
              style={{ width: 390 }}
              onChange={(e) => {
                setGroomer(e.target.value);
              }}
              defaultValue={props.appointments.groomer}
            >
              {employees.map((e) => {
                return (
                  <MenuItem employees={e} value={e.firstName}>
                    {" "}
                    {e.firstName + " " + e.lastName}{" "}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="name"
            label="Notes for Groom"
            type="text"
            fullWidth
            multiline
            rows="4"
            onChange={(e) => {setGroomNotes(e.target.value)}}
            defaultValue={props.appointments.groomNotes}
          />
          <TextField
            margin="dense"
            id="name"
            label="Estimated Quote"
            type="number"
            fullWidth
            onChange={(e) => {setQuote(e.target.value)}}
            defaultValue={props.appointments.quote}
          />
          <TextField
            margin="dense"
            id="name"
            label="Pickup Time"
            type="text"
            fullWidth
            onChange={(e) => {setPickup(e.target.value)}}
            defaultValue={props.appointments.pickup}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button  color="primary" onClick={handleSaveAppointment}>
            Done!
          </Button>
        </DialogActions>
      </Dialog>
    )
  }