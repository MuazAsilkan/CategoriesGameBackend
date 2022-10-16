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
// ------------ Functions
const endOfTour = require("./functions/endOfTour");
const scoreCalculator = require('./functions/scoreCalculator');
const currentTourCounter =require('./functions/currentTourCounter');


io.on("connection", socket => {
    
    socket.on("joinroom", async (key, username) => {
        const room = await Room.findById(key);
        if (room&&room.usernames.length > 10) {
            
        } else {
            
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

    socket.on("finishtour", async (key) => {
        const room = await Room.findById(key);
        room.finishedUser++;
        const newroom = await Room.findByIdAndUpdate({ _id: key }, room);
        io.in(key).emit("finishtour", room);
        if (room.finishedUser===room.usernames.length) {
            io.in(key).emit("endtour",room);
        }
    })

    socket.on("waitingforscore",async(key,answers)=>{
        const room = await Room.findById(key);
        const userCount=await endOfTour(key,answers);
        //onst room1 = await Room.findById(key);
        //room1.currentTour++;
        //const newRoom=await Room.findByIdAndUpdate(key,room1);
        console.log(userCount);
        if (userCount===room.usernames.length) {
            console.log("burayada girdi");
            const scoreTable=await scoreCalculator(key);
            const lastRoom=await currentTourCounter(key,scoreTable);
            if (scoreTable===1) {
                const room2=await Room.findById(key);
                io.in(key).emit("scoretable",room2);
            }
        }
    });
})

app.set("socketio", io);
app.use('/api/createroom', createRoomRouter);
app.use('/api/loginroom', loginRoomRouter);
app.use('/api/room', roomRouter);

http.listen(4000, function () {
    console.log("listening on 4000");
}) 