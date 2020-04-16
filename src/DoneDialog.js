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
  const [bather, setBather] = useState(props.appointments.bather)
  const [groomer, setGroomer] = useState(props.appointments.groomer)
  const [groomNotes, setGroomNotes] = useState(props.appointments.groomNotes)
  const [quote, setQuote] = useState(props.appointments.quote)
  const [pickup, setPickup] = useState(props.appointments.pickup)
  const [employees, setEmployees] = useState([]);

  const handleSaveAppointment = () => {
    db.collection("appointments")
      .doc(props.appointments.id)
      .update({
        groomNotes: groomNotes,
        quote: quote,
        pickup: pickup,
        status: "complete",
        bather: bather,
        groomer: groomer,
        }).then(() => {
          setBather("");
          setGroomer("");
          setGroomNotes("");
          setQuote("");
          setPickup("");
          setEmployees([]);
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
            disabled
            autoFocus
            margin="dense"
            id="name"
            label="Scheduled Time"
            type="text"
            fullWidth
            defaultValue={props.appointments.time}
          />
          <TextField
            disabled
            margin="dense"
            id="name"
            label="Dog Name"
            type="text"
            fullWidth
            defaultValue={props.appointments.dogName}
          />
          <TextField
            disabled
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
            defaultValue={props.appointments.groomNotes}
            onChange={(e) => {setGroomNotes(e.target.value)}}
          />
          <TextField
            margin="dense"
            id="name"
            label="Estimated Quote"
            type="number"
            fullWidth
            defaultValue={props.appointments.quote}
            onChange={(e) => {setQuote(e.target.value)}}
          />
          <TextField
            margin="dense"
            id="name"
            label="Pickup Time"
            type="text"
            fullWidth
            defaultValue={props.appointments.pickup}
            onChange={(e) => {setPickup(e.target.value)}}
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