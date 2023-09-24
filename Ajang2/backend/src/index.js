const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//const HOST = "0.0.0.0";
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World111");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

console.log(path.join(__dirname, "../uploads"));
app.use(express.static(path.join(__dirname, "../uploads")));

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
app.listen(port, () => console.log(`Listening on port ${port}`));
