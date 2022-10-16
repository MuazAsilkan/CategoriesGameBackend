const Room = require("../models/roomModel");

const endOfTour=async (key,answers)=>{
    try {
        const {  username,animal,plant,stuff } = answers;
        let {name,city}=answers;
        name=name.toUpperCase();
        city=city.toUpperCase();
        if (key !== undefined) {
            const room = await Room.findById(key);
            if (room) {
                room.scoreCalculator++;
                room.usernames.forEach(user => {
                    if (user.name === username) {
                        switch (room.currentTour) {
                            case 1:
                                user.answers=[]
                                user.answers.push({name,city,animal,plant,stuff});
                                room.currentTour=user.answers.length;
                                break;
                            default:
                                user.answers.push({name,city,animal,plant,stuff});
                                room.currentTour=user.answers.length;
                                break;
                        }
                    }
                    
                    
                    
                });
                room.addAnswerCounter++;
                // if (room.addAnswerCounter===room.usernames.length) {
                //     room.addAnswerCounter=0;
                //     scoreCalculator(key);
                // }
                console.log(room.addAnswerCounter);
                const newRoom= await Room.findByIdAndUpdate(key,room); 
                return (room.addAnswerCounter)
                
            } else {
                return({ msg: "Oda bulunamıyor" })
            }
        }
    } catch (error) {
        return(error);
    }
}


module.exports=endOfTour;