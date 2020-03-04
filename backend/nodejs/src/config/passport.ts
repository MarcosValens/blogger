import passport from 'passport';
import * as strategies from './strategies/index';

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

for (const strategy in strategies) {
    const _strategy = (strategies as any)[strategy];
    console.log(_strategy)
    passport.use(_strategy);
}

