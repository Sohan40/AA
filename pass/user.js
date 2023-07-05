

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const {genPassword,validPassword} = require('./util')


const verifyCallback =  (username,password,done)=>{
   
        User.findOne({username:username})
        .then((user)=>{
            if(!user){return done(null,false)}

            console.log(user._id)
            const isValid = validPassword(password,user.salt,user.hash);

            if(isValid){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
        .catch(e=>{
            done(e)
        })
}

const strategy = new LocalStrategy(verifyCallback);

passport.use('userStrategy', strategy);

passport.serializeUser((student,done)=>{
    done(null,student._id);
})

passport.deserializeUser((studentId,done)=>{
    User.findById(studentId)
    .then((student)=>{
        done(null,student)
    })
    .catch(err=>done(err))
})


