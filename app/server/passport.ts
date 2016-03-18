import { Strategy as LocalStrategy } from 'passport-local';
import * as passport from 'passport';
import * as db from './db';

export function initializePassport() {

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        db.getAdmin(username)
            .then(admin => done(null, admin));
    });

    passport.use(new LocalStrategy(
        (username, password, done) => {

            db.authenticate({ username, password })
                .then(admin => {
                    if (admin) {
                        done(null, admin);
                    } else {
                        done(null, false);
                    }
                })
                .catch(done);
        }
    ));
}
