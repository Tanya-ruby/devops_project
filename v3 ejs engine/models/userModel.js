const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

email:{
    type:String,reuired:true
},
usn:{type:String,reuired:true},
pass:{type:String,reuired:true},
name:{type:String,reuired:true},
section:{type:String,reuired:true}


});



module.exports = mongoose.model('user',userSchema);

