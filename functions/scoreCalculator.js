const Room = require("../models/roomModel");
const https = require('https');
const fetch = require('node-fetch');
const axiosInstance = require("../axios/axios");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const {nameController} = require("../source/name");
const {cityController} = require("../source/city");

const checkWord = async (counter, word) => {
    let maxScore = 10;
    if (counter > 1) {
        maxScore = 5;
    }
    const encodedWord=encodeURIComponent(word);
    const res = await axiosInstance.post(encodedWord); 
    //console.log(res.data);
    if (res.data.error) {
        console.log(res.data.error);
        return 0;
    }else{
        return maxScore;
    }

}

const scoreCalculator = async (key) => {

    const room = await Room.findById(key);
    if (room) {

        const answersForName = [];
        const answersForCity = [];
        const answersForAnimal = [];
        const answersForPlant = [];
        const answersForStuff = [];

        await room.usernames.forEach(user => {
            answersForName.push(user.answers[room.currentTour - 1].name);
            answersForCity.push(user.answers[room.currentTour - 1].city);
            answersForAnimal.push(user.answers[room.currentTour - 1].animal);
            answersForPlant.push(user.answers[room.currentTour - 1].plant);
            answersForStuff.push(user.answers[room.currentTour - 1].stuff);
        });// bütün cevaplar listelere kayıt edildi



        await room.usernames.forEach(async user => {
            let counterForName = 0;
            let counterForCity = 0;
            let counterForAnimal = 0;
            let counterForPlant = 0;
            let counterForStuff = 0;

            const nameAnswer = user.answers[room.currentTour - 1].name;
            const cityAnswer = user.answers[room.currentTour - 1].city;
            const animalAnswer = user.answers[room.currentTour - 1].animal;
            const plantAnswer = user.answers[room.currentTour - 1].plant;
            const stuffAnswer = user.answers[room.currentTour - 1].stuff;

            answersForName.forEach(element => {
                if (element === nameAnswer) {
                    counterForName++;
                }
            });

            answersForCity.forEach(element => {
                if (element === cityAnswer) {
                    counterForCity++;
                }
            });

            answersForAnimal.forEach(element => {
                if (element === animalAnswer) {
                    counterForAnimal++;
                }
            });

            answersForPlant.forEach(element => {
                if (element === plantAnswer) {
                    counterForPlant++;
                }
            });

            answersForStuff.forEach(element => {
                if (element === stuffAnswer) {
                    counterForStuff++;
                }
            });
            //// adetler sayıldı

            const scoreOfName = await nameController(counterForName, nameAnswer);
            const scoreOfCity = await cityController(counterForCity, cityAnswer);
            const scoreOfAnimal = await checkWord(counterForAnimal, animalAnswer);
            const scoreOfPlant = await checkWord(counterForPlant, plantAnswer);
            const scoreOfStuff = await checkWord(counterForStuff, stuffAnswer);

            user.score = user.score + scoreOfName + scoreOfCity + scoreOfAnimal + scoreOfPlant + scoreOfStuff;
            console.log("user score : "+user.score);
            console.log("name score : "+scoreOfName);
 
            const newRoom = await Room.findByIdAndUpdate(key, room);
        });
        

        return (1);
    }
}

module.exports = scoreCalculator;