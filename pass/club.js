
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Club = require('../models/clubs');
const bcrypt = require('bcrypt');

const verifyCallback =  (email,password,done)=>{
   
        Club.findOne({email:email})
        .then((club)=>{
            if(!club){return done(null,false)}

            console.log(club._id)
            const isValid = bcrypt.compare(password,club.password);

            if(isValid){
                return done(null,club);
            }
            else{
                return done(null,false);
            }
        })
        .catch(e=>{
            done(e)
        })
}

const strategy = new LocalStrategy({usernameField:'email'},verifyCallback);

passport.use('clubStrategy', strategy);

passport.serializeUser((club,done)=>{
    done(null,club._id);
})

passport.deserializeUser((clubId,done)=>{
    User.findById(clubId)
    .then((club)=>{
        done(null,club)
    })
    .catch(err=>done(err))
})


