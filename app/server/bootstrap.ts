import * as express from 'express';
import * as path from 'path';

import {ng2engine} from 'angular2-universal-preview';

import {App} from '../shared/app';

let app = express();

// Express View
app.engine('.ng2.html', ng2engine);
app.set('views', `${process.cwd()}/app/server/`);
app.set('view engine', 'ng2.html');


// static files
app.use(express.static(process.cwd()));


app.use('/', (req, res) => {
    res.render('index', {App});
});


app.listen(3000, () => {
    console.log('Listen on http://localhost:3000');
});