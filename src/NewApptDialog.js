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
import { db } from "./firebase";
import FormControl from '@material-ui/core/FormControl';

export default function NewApptDialog(props) {

  const [bather, setBather] = useState("")
  const [groomer, setGroomer] = useState("")

  const handleChangeOne = (e) => {
    setBather(e.target.value);
  }

  const handleChangeTwo = (e) => {
    setGroomer(e.target.value);
  }
    return(
<Dialog open={props.open} onClose = {props.onClose} maxWidth="xs">
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scheduled Time"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Dog Name"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Dog Type"
            type="email"
            fullWidth
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Bather</InputLabel>
            <Select
              style={{width:390}}
              onChange={handleChangeOne}
              value={bather}
            >
              <MenuItem value={"Hannah"}>Hannah</MenuItem>
              <MenuItem value={"Cheri"}>Cheri</MenuItem>
              <MenuItem value={"Monica"}>Monica</MenuItem>
              <MenuItem value={"Rachel"}>Rachel</MenuItem>
              <MenuItem value={"Sarah"}>Sarah</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Groomer</InputLabel>
            <Select
              style={{width:390}}
              onChange={handleChangeTwo}
              value={groomer}
            >
              <MenuItem value={"Hannah"}>Hannah</MenuItem>
              <MenuItem value={"Cheri"}>Cheri</MenuItem>
              <MenuItem value={"Monica"}>Monica</MenuItem>
              <MenuItem value={"Rachel"}>Rachel</MenuItem>
              <MenuItem value={"Sarah"}>Sarah</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button  color="primary" onClick={props.onClose}>
            Add To Schedule
          </Button>
        </DialogActions>
      </Dialog>
    )
  }