const mongoose = require('mongoose');   
const User = require('./users')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:[{
        type:String,
        required:true
    }],
    lastDate:{
        type:Date,
        required:true
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]

})

module.exports = mongoose.model('Post',postSchema);