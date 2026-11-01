const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data.room);
        socket.to(data.room).emit('player_joined', { name: data.name });
    });

    socket.on('submit_row', (data) => {
        io.to(data.room).emit('update_board', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
