const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RoomSchema=new Schema({
    playerNumber:{type:Number,default:1},
    times:{type:Number,required:true},
    tour:{type:Number,required:true},
    usernames:{type:Array,required:true},
    letter:String,
    active:{type:Boolean,default:false},
    finishedUser:{type:Number,default:0}

},{collection:'rooms',timestamps:true});

const Room=mongoose.model('Room',RoomSchema);

module.exports=Room; 