import * as googleStrategy from 'passport-google-oauth2';

require("./../environment");
const userService = require('../../service/userService')
const GoogleStrategy = googleStrategy.Strategy;

const options: googleStrategy.StrategyOptionsWithRequest = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
};

function callback(request, accessToken, refreshToken, profile, done) {
    // Comprobar usuarios aqui?
    if(userService.isValidate(profile)){
        console.log("valida")
    };
    done(null, {profile});
}

export const Google = (() => new GoogleStrategy(options, callback))();