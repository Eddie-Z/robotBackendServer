var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


app.get("/api/runStartSript", (req, res, next) => {
    const exec = require('child_process').exec;
    const myShellScript = exec('sh start.sh ');
    myShellScript.stdout.on('data', (data) => {
        console.log(data);
        res.json({ "message": "successfuly ran script" })
    });
    myShellScript.stderr.on('data', (data) => {
        console.error(data);
        return;
    });
});

app.get("/api/runStopScript", (req, res, next) => {
    const exec = require('child_process').exec;
    const myShellScript = exec('sh stop.sh ');
    myShellScript.stdout.on('data', (data) => {
        console.log(data);
        res.json({ "message": "successfuly ran stop script" })
    });
    myShellScript.stderr.on('data', (data) => {
        console.error(data);
        return;
    });
});



// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

