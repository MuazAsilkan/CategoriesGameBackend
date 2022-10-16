const express = require('express');
const router = express.Router();
const Room = require("../models/roomModel");

///// GET INFO
router.post('/', async (req, res) => {
    try {

        const { key } = req.body;
        if (key !== undefined) {
            const room = await Room.findById(key);
            if (room) {
                res.send(room);
            } else {
                res.send({ msg: "Oda bulunamıyor" })
            }
        }


    } catch (error) {
        res.send(error);
    }

});
///// END OF TOUR
router.post('/tour', async (req, res) => {
    try {
        const { key, username, name, city, animal, plant, stuff } = req.body;
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
                                room.currentTour=user.answers.length+1;
                                break;
                            default:
                                user.answers.push({name,city,animal,plant,stuff});
                                room.currentTour=user.answers.length+1;
                                break;
                        }
                    }
                });
                room.addAnswerCounter++;
                console.log(room.addAnswerCounter);
                if (room.addAnswerCounter===room.usernames.length) {
                    room.addAnswerCounter=0;
                    scoreCalculator(key);
                }
                const newRoom= await Room.findByIdAndUpdate(key,room); 
                res.send(room);
            } else {
                res.send({ msg: "Oda bulunamıyor" })
            }
        }
    } catch (error) {
        res.send(error);
    }

});

const scoreCalculator=async (key)=>{
    const room = await Room.findById(key);
    if (room) {
        const answersForName=[];
        const answersForCity=[];
        const answersForAnimal=[];
        const answersForPlant=[];
        const answersForStuff=[];
        room.usernames.forEach(user => {
            answersForName.push(user.answers[room.currentTour-2].name);
            answersForCity.push(user.answers[room.currentTour-2].city);
            answersForAnimal.push(user.answers[room.currentTour-2].animal);
            answersForPlant.push(user.answers[room.currentTour-2].plant);
            answersForStuff.push(user.answers[room.currentTour-2].stuff);
        });

        room.usernames.forEach(user => {
            let counterForName=0;
            let counterForCity=0;
            let counterForAnimal=0;
            let counterForPlant=0;
            let counterForStuff=0;

            const nameAnswer=user.answers[room.currentTour-2].name;
            const cityAnswer=user.answers[room.currentTour-2].city;
            const animalAnswer=user.answers[room.currentTour-2].animal;
            const plantAnswer=user.answers[room.currentTour-2].plant;
            const stuffAnswer=user.answers[room.currentTour-2].stuff;

            answersForName.forEach(element => {
                if (element===nameAnswer) {
                    
                }
            });


        });

    }
}

module.exports = router;