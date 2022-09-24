const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
require('./db/dbConnection');
const cors = require('cors')
app.use(cors());


app.use(express.json());

// ------------ Models
const Room = require("./models/roomModel");
// ------------ Routers
const createRoomRouter = require('./routers/createRoomRouter');
const loginRoomRouter = require("./routers/loginRoomRouter")
const roomRouter = require("./routers/roomRouter");
const userList = ["kişi", "kişicikler"];




io.on("connection", socket => {
    
    socket.on("joinroom", async (key, username) => {
        const room = await Room.findById(key);
        if (room&&room.usernames.length > 9) {
            
        } else {
            room.usernames.push(username);
            const newroom = await Room.findByIdAndUpdate({ _id: key }, room);
            socket.join(key);
            
            io.in(key).emit("joinroom", room);
        }
    })

    socket.on("leaveroom", async (key, username) => {
        socket.leave(key)
        const room = await Room.findById(key);
        const indexNumber=room.usernames.indexOf(username);
        room.usernames.splice(indexNumber,1);
        const newroom = await Room.findByIdAndUpdate({ _id: key }, room);
        io.in(key).emit("joinroom", room)
    })

    socket.on("roomsettings", async (key, settings) => {
        const room = await Room.findById(key);
        room.times=settings.time;
        room.tour=settings.tour;
        const newroom = await Room.findByIdAndUpdate({ _id: key }, room);
        io.in(key).emit("joinroom", room)
    })

    socket.on("gamestart", async (key, start) => {
        const room = await Room.findById(key);
        room.active = start;
        const newroom = await Room.findByIdAndUpdate({ _id: key }, room);
        io.in(key).emit("joinroom", room);
    })

    socket.on("finishtour", async (key, start) => {
        const room = await Room.findById(key);
        room.finishedUser++;
        const newroom = await Room.findByIdAndUpdate({ _id: key }, room);
        io.in(key).emit("finishtour", room);
    })
})

app.set("socketio", io);
app.use('/api/createroom', createRoomRouter);
app.use('/api/loginroom', loginRoomRouter);
app.use('/api/room', roomRouter);

http.listen(4000, function () {
    console.log("listening on 4000");
}) 