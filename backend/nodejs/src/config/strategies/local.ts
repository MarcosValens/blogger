import * as LocalSt from 'passport-local';
import {User} from '../../model/User';

const LocalStrategy = LocalSt.Strategy;

async function callback(email, password, done) {
    const user = await User.findOne({
        where: {
            email
        },
        attributes: ["username", "email", "password"]
    });
    if (!user) {
        return done(null, false, "User doesn't exist");
    }
    if (!user.password) {
        return done(null, user);
    }

    if (user.password !== password) {
        return done(null, false, "Wrong credentials");
    }

    done(null, user);

}

export const Local = (() => new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, callback))();