const express = require('express');
const router = express.Router();
const Room = require("../models/roomModel");

router.post('/', async (req, res) => {
    try {
        
        const {key,username} = req.body;
        if (key!==undefined) {
            const room=await Room.findById(key);
            if (room&&room.usernames.length<10) {
                res.send({msg:"Giriş başarılı :)"});
            }else{
            res.send({msg:"Oda dolu veya kapalı durumda"})
            }
        }
        
        
        

    } catch (error) {
        res.send(error);
    }

});



module.exports = router;