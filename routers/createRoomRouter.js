const express = require('express');
const router = express.Router();
const Room = require("../models/roomModel");

router.post('/', async (req, res) => {
    try {
        const roomSettings=req.body;
        roomSettings.usernames=[{
            name: roomSettings.username,
            score:0
        }]
        const newRoom = new Room(roomSettings);
        const sonuc = await newRoom.save();
        
        /*const io=req.app.get("socketio");
        io.to(sonuc._id).emit(req.body.username);*/
        //const roomNumber=Math.floor(Math.random() * 101);

        res.send(sonuc);
    } catch (error) {
        res.send(error);
    }

});



module.exports = router;