const Room = require("../models/roomModel");

const currentTourCounter=async (key,score)=>{
    const room=await Room.findById(key);
    console.log("current tour :"+room.currentTour);
    room.currentTour++;
    console.log("current tour :"+room.currentTour);
    const newRoom=await Room.findByIdAndUpdate(key,room);
    return newRoom;
}

module.exports=currentTourCounter;