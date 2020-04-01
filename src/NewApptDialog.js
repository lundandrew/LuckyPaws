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

export default function NewApptDialog(props) {
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
          <InputLabel>
          <Select
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem>Hannah</MenuItem>
                <MenuItem>Cheri</MenuItem>
                <MenuItem>Monica</MenuItem>
                <MenuItem>Rachel</MenuItem>
                <MenuItem>Sarah</MenuItem>
              </Select>
          </InputLabel>
          <InputLabel>
          <Select
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem>Hannah</MenuItem>
                <MenuItem>Cheri</MenuItem>
                <MenuItem>Monica</MenuItem>
                <MenuItem>Rachel</MenuItem>
                <MenuItem>Sarah</MenuItem>
              </Select>
          </InputLabel>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button  color="primary" onClick={props.onClose}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    )
}