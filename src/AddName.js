import React, { useState, useEffect } from "react";
import {
    AppBar,
    Button,
    Paper,
    TextField,
    Toolbar,
    Typography,
    Dialog,
    DialogActions,
    DialogTitle,
  } from "@material-ui/core";
  import { db } from "./firebase";

export default function AddName(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSaveName = () => {
        db.collection("users")
          .doc(props.user.uid)
          .update(
            {firstName: firstName,
             lastName: lastName,
            })
          .then(() => {
            props.onClose();
            })
      }

    return(
        <Dialog open={props.open} onClose={props.onClose} maxWidth="xs">
        <DialogTitle style={{display:'flex', justifyContent:'center'}}>Add Your Name</DialogTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper style={{ width: "480px", padding: "30px" }}>
            <TextField
              placeholder={"First Name"}
              variant="outlined"
              fullWidth={true}
              defaultValue={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              placeholder="Last Name"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: "10px" }}
              defaultValue={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "10px"
              }}
            >
              <DialogActions>
                <Button color="primary" variant="contained" onClick={props.onClose}>
                    Cancel
                </Button>
                <Button  color="primary" variant="contained" onClick={handleSaveName}>
                    Add Your Name
                </Button>
                </DialogActions>
            </div>
          </Paper>
        </div>
        </Dialog>
    )
}