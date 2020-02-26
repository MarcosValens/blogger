import * as passport from 'passport';
import * as strategies from './strategies/index';

for (const strategy in strategies) {
    const _strategy = (strategies as any)[strategy];
    passport.use(_strategy);
}

