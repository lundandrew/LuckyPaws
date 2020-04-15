import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { db } from "./firebase";

export default function Completed(props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState("");
    const [tip, setTip] = useState("");

    const handleSaveDialog = () => {
        db.collection("appointments")
          .doc(props.appointments.id)
          .update(
            {tip: tip,
             totalPrice: totalPrice,
            })
          .then(() => {
            handleClose();
            })
      }

      const handleClose = () => {
        setDialogOpen(false);
      };

    return(
    <div>
        <div>
                <Card style={{marginTop:10}}>
                    <TableRow style={{display:'flex', justifyContent:'space-between'}}>
                        <TableCell >{props.completed.time}</TableCell>
                        <TableCell >{props.completed.dogName}</TableCell>
                        <TableCell >{props.completed.dogType}</TableCell>
                        <TableCell >{props.completed.bather}</TableCell>
                        <TableCell >{props.completed.groomer}</TableCell>
                        <TableCell >{props.completed.groomNotes}</TableCell>
                        <TableCell >{props.completed.pickup}</TableCell>
                        <TableCell >{props.completed.quote}</TableCell>
                        <TableCell  onClick={() => {setDialogOpen(true)}}><Button variant="contained" color="primary">Add Tip!</Button></TableCell>
                    </TableRow>
                </Card>
        </div>
        <div>
            <Dialog open={dialogOpen} maxWidth="xs">
                <DialogTitle style={{display:'flex', justifyContent:'center'}}>Price and Tip</DialogTitle>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Paper style={{ width: "480px", padding: "30px" }}>
                        <TextField
                        placeholder={"Total Price"}
                        variant="outlined"
                        fullWidth={true}
                        onChange={e => {
                            setTotalPrice(e.target.value);
                        }}
                        />
                        <TextField
                        placeholder="Tip"
                        variant="outlined"
                        fullWidth={true}
                        style={{ marginTop: "10px" }}
                        onChange={e => {
                            setTip(e.target.value);
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
                            <Button  color="primary" variant="contained" onClick={handleSaveDialog}>
                                Add Price and Tip
                            </Button>
                            </DialogActions>
                        </div>
                    </Paper>
                </div>
            </Dialog>
        </div>
    </div>
    )
}