
const mongoose = require('mongoose');   
const passportLocalMongoose = require('passport-local-mongoose')
const crypto = require('crypto');

const userSchema =new mongoose.Schema({
    email: String,
    username:String,
    department:String,
    year:String,
    Roll_No:String,
    hash:String,
    salt:String
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);