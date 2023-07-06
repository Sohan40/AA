

const mongoose = require('mongoose');   

const express =require('express');

const bcrypt = require('bcrypt');
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
require('./pass/club');


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
app.get("/register/club",function(req,res)
{
    res.render("clubs/register");
})

app.get("/login/club",function(req,res)
{
    res.render("clubs/login");
})
app.post("/login",passport.authenticate('userStrategy',{failureRedirect:'/login',failureMessage:true}),async function(req,res)
{
    
    res.send('logged IN');

});

app.post("/login/club",passport.authenticate('clubStrategy',{failureRedirect:'/register/club',failureMessage:true}),async function(req,res)
{
    
    res.send('logged IN as club');

});

app.post("/register",async function(req,res)
{
    
    const password = await bcrypt.hashSync(req.body.password,12);
    const newUser = new User({

        email: req.body.email,
        username:req.body.username,
        department:req.body.department,
        year:req.body.year,
        Roll_No:req.body.roll_No,
        password:password
     })
    newUser.save();
    res.redirect('/login')
})

app.post("/register/club",async function(req,res)
{
    
    const password = await bcrypt.hashSync(req.body.password,12);
    const newUser = new Club({

        email: req.body.email,
        
        password:password
     })
    newUser.save();
    res.redirect('/login/club')
})



app.listen(3000,()=>{
    console.log("Started");
})