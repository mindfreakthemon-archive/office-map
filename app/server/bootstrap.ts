import * as express from 'express';
import * as parser from 'body-parser';
import * as passport from 'passport';

import cookieParser = require('cookie-parser');
import session = require('express-session');

import { initializePassport } from './passport';
import { roAPI } from './ro.api';
import { rwAPI } from './rw.api';

const PORT = process.env['PORT'] || 3000;

let app = express();

initializePassport();

app.set('views', './app/shared/');
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(session({
    secret: 'weshouldchangethissometimesoon',
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: 864000000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./build/client/'));

app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

app.use('/api', roAPI);
app.use('/api', rwAPI);

app.post('/authenticate', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

app.get('/logout', (req, res) => {
    req.logout();
    
    res.redirect('/');
});

app.all('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Listen on http://localhost:${PORT}`);
});
