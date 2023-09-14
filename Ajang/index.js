const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://momnpa333:1234@cluster0.vwpsyvs.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => console.log(`Server is listening on port ${port}`));
