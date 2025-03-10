import express from "express";
import mongoose from "mongoose";

//App Config
const app = express();
const port = process.env.PORT || 8001;

//Middleware

//DB Config
mongoose.connect(connection_url, {});

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Dughub Backend"));

//Listenr
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
