import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { auth, snapshotToArray, db } from "./firebase";
import Scheduled from "./Scheduled";
import AddName from "./AddName"

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([])
  const [addNameOpen, setAddNameOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });
    return unsubscribe;
  }, [props.history]);

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
        const updated_employees = snapshotToArray(snapshot)
        setEmployees(updated_employees)
    })
    return unsubscribe
  }, [props])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
          >
            My App
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleSignOut}>
            Sign out
          </Button>
          <Button color="inherit" variant="outlined" style={{marginLeft:10}} onClick={() => {setAddNameOpen(true)}}>
            Add Your Name
          </Button>
        </Toolbar>
        <AddName user={user} open = {addNameOpen} onClose={() => {setAddNameOpen(false)}}/>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List style={{width:"480px"}} >
          <ListItem button>
            <ListItemText primary="Check-In Dogs" />
          </ListItem>
          {employees.map((e) => {
            return(
              <ListItem button onClick={() => {setDrawerOpen(false)}}>
              <ListItemText primary={e.firstName + " " + e.lastName + "'s Schedule"}/>
            </ListItem>
            )
          })}
          <ListItem button>
            <ListItemText primary="Payroll Summary" />
          </ListItem>
        </List>
      </Drawer>
      <Scheduled>
      </Scheduled>
    </div>
  );
}
