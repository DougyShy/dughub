import logo from "./images/yin_yang.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import LocalGroceryStore from "@mui/icons-material/LocalGroceryStore";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Yard from "@mui/icons-material/Yard";
import Tooltip from "@mui/material/Tooltip";
import Groceries from "./components/Groceries";
import Calendar from "./components/Calendar";
import YardCare from "./components/YardCare";

import CustomizedMenus from "./components/StyledMenu.tsx";

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
  const [displays, setDisplays] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser); Not necessary right now
        setUser(authUser);
      } else {
        setUser(null);
        setDisplays("");
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
      setDisplays("Groceries");
      console.log("Current display: " + displays);
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
              <img className="app__headerImage" src={logo} alt="Header" />
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
              <img className="app__headerImage" src={logo} alt="Header" />
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
            <Button
              type="submit"
              onClick={signIn}
              style={{ color: "black", fontWeight: "bold" }}
            >
              Sign In
            </Button>
          </form>
        </StyledBox>
      </Modal>
      <div className="app__header">
        <div className="app__logo__header">
          <img src={logo} className="app__logo" alt="logo" />
          {user ? (
            <>
              <p style={{ color: "black", fontWeight: "bold" }}>
                Welcome, {user.displayName}
              </p>
            </>
          ) : (
            <>
              <p style={{ color: "black", fontWeight: "bold" }}>DugHub</p>
            </>
          )}
        </div>
        <div className="app__header__mid">
          <Tooltip title="Groceries">
            <LocalGroceryStore
              fontSize="large"
              style={{
                cursor: "pointer",
                opacity: displays === "Groceries" && user ? 1 : 0.5, // Use ternary to adjust opacity
                color: displays === "Groceries" && user ? "black" : "gray", // Change color to black if "Groceries", else gray
              }}
              onClick={() => setDisplays("Groceries")} // Inline state change
            />
          </Tooltip>
          <Tooltip title="Calendar">
            <CalendarMonth
              fontSize="large"
              style={{
                cursor: "pointer",
                opacity: displays === "Calendar" && user ? 1 : 0.5, // Use ternary to adjust opacity
                color: displays === "Calendar" && user ? "black" : "gray", // Change color to black if "Groceries", else gray
              }}
              onClick={() => setDisplays("Calendar")} // Inline state change
            />
          </Tooltip>
          <Tooltip title="Yard">
            <Yard
              fontSize="large"
              style={{
                cursor: "pointer",
                opacity: displays === "Yard" && user ? 1 : 0.5, // Use ternary to adjust opacity
                color: displays === "Yard" && user ? "black" : "gray", // Change color to black if "Groceries", else gray
              }}
              onClick={() => setDisplays("Yard")} // Inline state change
            />
          </Tooltip>
        </div>

        {user ? (
          <>
            <CustomizedMenus />
            {/*<Button onClick={() => auth.signOut()}>Logout</Button>*/}
          </>
        ) : (
          <div className="app__loginContainer">
            <Button
              onClick={() => setOpenSignIn(true)}
              style={{ color: "black", fontWeight: "bold" }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => setOpen(true)}
              style={{ color: "black", fontWeight: "bold" }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
      {/* Using a switch statement to determine which page to render */}
      <div>
        {(() => {
          switch (displays) {
            case "Groceries":
              return (
                <div>
                  <h1>
                    <Groceries userName={user ? user.displayName : null} />
                  </h1>
                </div>
              );
            case "Calendar":
              return (
                <div>
                  <h1>
                    <Calendar userName={user ? user.displayName : null} />
                  </h1>
                </div>
              );
            case "Yard":
              return (
                <div>
                  <h1>
                    <YardCare userName={user ? user.displayName : null} />
                  </h1>
                </div>
              );
            default:
              return (
                <div>
                  <h1>Welcome to the Default Page</h1>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
}

export default App;
