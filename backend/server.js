import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Groceries from "../backend/models/Grocery.js";

//App Config
const app = express();
const port = process.env.PORT || 9000;

const connection_url =
  "mongodb+srv://dougscheible:fossil69@cluster1.2l0ue.mongodb.net/dughubDB?retryWrites=true&w=majority";

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url, {});

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Dughub Backend"));

app.get("/groceries", async (req, res) => {
  try {
    const groceries = await Groceries.find();
    res.status(200).json(groceries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching groceries", error: err });
  }
});

app.post("/groceries/new", async (req, res) => {
  const groceries = req.body;
  Groceries.create(groceries)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Listenr
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
