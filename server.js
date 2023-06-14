const express = require('express');


const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets/styles'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// socket
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log("Connected...");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    }) 
})


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
