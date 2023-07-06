const mongoose = require('mongoose');   

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Post = require('./posts')

const clubSchema = new Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    president:{
        type:String,
    },

    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
    email:{
        type:String,
    },
    password:String
})

clubSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Club',clubSchema);
