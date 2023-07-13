const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

email:{type:String,required:true},
usn:{type:String,required:true},
password:{type:String,required:true},
name:{type:String,required:true},
section:{type:String,required:true},
isAdmin:{type:String,default:0},
myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }]
});

module.exports = mongoose.model('Users',usersSchema);