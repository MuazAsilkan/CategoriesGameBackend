const express = require('express');
const router = express.Router();
const Room = require("../models/roomModel");

router.post('/', async (req, res) => {
    try {
        
        const {key} = req.body;
        if (key!==undefined) {
            const room=await Room.findById(key);
            if (room) {
                res.send(room);
            }else{
            res.send({msg:"Oda bulunamıyor"})
            }
        }

        
    } catch (error) {
        res.send(error);
    }

});

 
 
module.exports = router;