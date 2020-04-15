import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { db, snapshotToArray } from "./firebase";
import FormControl from "@material-ui/core/FormControl";

export default function NewApptDialog(props) {
  const [time, setTime] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogType, setDogType] = useState("");
  const [bather, setBather] = useState("");
  const [groomer, setGroomer] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSaveAppointment = () => {
    db.collection("appointments")
      .add({
        time: time,
        dogName: dogName,
        dogType: dogType,
        bather: bather,
        groomer: groomer,
        status: "pending",
      })
      .then(() => {
        setTime("");
        setDogName("");
        setDogType("");
        setBather("");
        setGroomer("");
        props.onClose();
      });
  };
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const updated_employees = snapshotToArray(snapshot);
      setEmployees(updated_employees);
    });
    return unsubscribe;
  }, [props]);

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="xs">
      <DialogTitle>New Appointment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Scheduled Time"
          type="email"
          fullWidth
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="name"
          label="Dog Name"
          type="email"
          fullWidth
          onChange={(e) => {
            setDogName(e.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="name"
          label="Dog Type"
          type="email"
          fullWidth
          onChange={(e) => {
            setDogType(e.target.value);
          }}
        />
        <FormControl>
          <InputLabel>Bather</InputLabel>
          <Select
            style={{ width: 390 }}
            onChange={(e) => {
              setBather(e.target.value);
            }}
            value={bather}
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
            value={groomer}
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
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSaveAppointment}>
          Add Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
