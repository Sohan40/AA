


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CollegeClub = require('./models/CollegeClub');


passport.use('clubStrategy', new LocalStrategy( async (username, password, done) => {
    try {
        const collegeClub = await CollegeClub.findOne({ username });
        if (!collegeClub) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        const isMatch = await collegeClub.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, collegeClub);
    } catch (error) {
        return done(error);
    }
}));