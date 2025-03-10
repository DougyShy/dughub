import logo from "./images/yin_yang.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";
import { Modal, Box } from "@mui/material";
import { Button, Input } from "@mui/material";
import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"; // for authentication

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  padding: "16px 32px 24px",
}));

function App() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(authUser.user, {
          displayName: username,
        });
      })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = async (e) => {
    e.preventDefault();

    try {
      // Use signInWithEmailAndPassword in a modular way
      await signInWithEmailAndPassword(auth, email, password);
      setOpenSignIn(false); // Close sign-in modal or proceed to next steps
    } catch (error) {
      alert(error.message); // Handle errors
    }
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <StyledBox>
          <form className="app__signup">
            <center>
              <img className="App__headerImage" src={logo} alt="Header" />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </StyledBox>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <StyledBox>
          <form className="app__signup">
            <center>
              <img
                className="App__headerImage"
                src="logo192.png"
                alt="Header"
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </StyledBox>
      </Modal>
      <div className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
