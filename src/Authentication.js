import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { db } from "./firebase";

export function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(u => {
        if (u) {
          props.history.push("/app");
        }
        // do something
      });
  
      return unsubscribe;
    }, [props.history]);
  
    const handleSignIn = () => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {})
        .catch(error => {
          alert(error.message);
        });
    };
  
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Sign In
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper style={{ width: "480px", marginTop: "50px", padding: "30px" }}>
            <TextField
              variant="outlined"
              placeholder={"Email"}
              fullWidth={true}
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              type={"password"}
              placeholder="Password"
              fullWidth={true}
              style={{ marginTop: "30px" }}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "30px"
              }}
            >
              <Typography>
                Don't have an account? <Link to="/signup">Sign up!</Link>
              </Typography>
              <Button color="primary" variant="contained" onClick={handleSignIn}>
                Sign in
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
  
  export function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] =useState("");
    const [lastName, setLastName] = useState("")
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(u => {
        if (u) {
          props.history.push("/app");
        }
        // do something
      });
  
      return unsubscribe;
    }, [props.history]);

    const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {})
          .catch(error => {
            alert(error.message);
          })};
  
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Sign Up
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper style={{ width: "480px", marginTop: "50px", padding: "30px" }}>
            <div style={{display:"flex", justifyContent: 'space-between', marginBottom:30}}>
              <TextField
                variant="outlined"
                placeholder={"First Name"}
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                placeholder={"Last Name"}
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <TextField
              placeholder={"Email"}
              variant="outlined"
              fullWidth={true}
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              type={"password"}
              placeholder="Password"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: "30px" }}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "30px"
              }}
            >
              <Typography>
                Already have an account? <Link to="/">Sign in!</Link>
              </Typography>
              <Button color="primary" variant="contained" onClick={handleSignUp}>
                Sign up
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
}