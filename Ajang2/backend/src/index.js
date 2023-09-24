const express = require("express");

const app = express();
const port = 8080;
//const HOST = "0.0.0.0";

app.get("/", (req, res) => {
    res.send("Hello World111");
});

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
app.listen(port, () => console.log(`Listening on port ${port}`));
