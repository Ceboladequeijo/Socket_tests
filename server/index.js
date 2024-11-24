
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 8080
const server = require('http').createServer(app)

const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname,"../app")))
console.log(__dirname)
app.use(cors);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message,socket.id);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});
io.on('connect_error', (err) => console.error('Erro de conexão:', err));
server.listen(PORT, () => console.log('listening on http://localhost:8080') );
// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });


 