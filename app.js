const express = require('express');
const app = express();
const http = require('http').Server(app);
const socketio = require('socket.io');
const io = socketio(http);

const algoUrl = "https://mstrdav.github.io/adaProgrammingContest"

const challenges = [
    "echo hello world",
    "pwd",
    "ls",
    "cat woodstock.txt",
    "touch dot.jpeg",
    "cd frites",
    "ls ../",
    "date",
    "whoami",
    "mkdir repoToDelete",
    "rm -r repoToDelete",
    "file ../dot.jpeg",
    "cd /home/hacker/soireeInfo/epreuve_algo"
]

const reponses = [
    "hello world",
    "/home/hacker/soireeInfo",
    "<i>frites</i> <i>epreuve_algo</i> woodstock.txt",
    "vive leo hendrix <3",
    "",
    "",
    "<i>frites</i> <i>epreuve_algo</i> woodstock.txt dot.jpeg",
    "",
    "hacker",
    "",
    "",
    "dot.jpeg: empty",
    "",
]

app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    })
    .use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.challengeID = 0;

    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });

    socket.on('try', (data) => {

        if (data == challenges[socket.challengeID]) {
            if (socket.challengeID == 5) {
                socket.emit('endpoint', "~/soireeInfo/frites");
            }
            if (socket.challengeID == 7) {
                reponses[7] = Date().toString();
            }
            if (socket.challengeID == 12) {
                socket.emit('end', algoUrl);
            }
            socket.emit('valid', reponses[socket.challengeID]);
            socket.challengeID += 1;
            console.log("Command valid, ID = ", +socket.challengeID);
        } else {
            socket.emit('not valid', data + " - not the expected answer");
        }
    })
});

http.listen(8080, () => {
    console.log("Listening on port 8080.");
})