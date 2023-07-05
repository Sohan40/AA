

const mongoose = require('mongoose');   

const express =require('express');


const ejs=require("ejs");

const session = require("express-session");

const app = express();

const crypto = require('crypto');

const User = require('./models/users');
const Post = require('./models/posts');
const Club = require('./models/clubs');

const passport =require("passport");
const passportLocalMongoose =require("passport-local-mongoose");
const { genPassword } = require('./pass/util');

require('./pass/user');

app.use(express.static("public"));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/AA')
.then(()=>{
    console.log("connection open");
})
.catch((err)=>{
    console.log(err);
})


// important changes need to be done here



app.use(session({
    secret:"Our little Secret.",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());

app.use(passport.session());



// uptil here 
app.get("/",function(req,res)
{
    res.send("home");
})
app.get("/login",function(req,res)
{
    res.render("user/login");
})
app.get("/register",function(req,res)
{
    res.render("user/register");
})

app.post("/login",passport.authenticate('userStrategy',{failureRedirect:'/login',failureMessage:true}),async function(req,res)
{
    
    res.send('logged IN');

});

app.post("/register",function(req,res)
{
    const newUser = new User({

    email: req.body.email,
    username:req.body.username,
    department:req.body.department,
    year:req.body.year,
    Roll_No:req.body.roll_No
 })
    

    User.register(newUser,req.body.password,function(err,user)
    {
        
        if(err)
        {
            console.log(err);
            res.redirect("/register");
        }
        else{
            console.log(user);
            passport.authenticate("userStrategy")(req,res,function(){
                    res.redirect("/");
            })
            
        }
    })
})

app.listen(3000,()=>{
    console.log("Started");
})