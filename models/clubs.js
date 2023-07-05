const mongoose = require('mongoose');   

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Post = require('./posts')

const clubSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    president:{
        type:String,
        required:true
    },

    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
    email:{
        type:String,
        required:true
    }
})

clubSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Club',clubSchema);
