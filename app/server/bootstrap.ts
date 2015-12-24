import * as express from 'express';
import * as path from 'path';

import {ng2engine, BASE_URL, HTTP_PROVIDERS, SERVER_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {provide} from 'angular2/angular2';
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {App} from '../shared/app/app';

let app = express();

app.engine('.ng2.html', ng2engine);
app.set('views', `${process.cwd()}/app/server/`);
app.set('view engine', 'ng2.html');

app.use(express.static(process.cwd()));

// temporarily disable server side rendering.
app.use('/', (req, res) => {
    res.sendFile(`${process.cwd()}/app/server/index.ng2.html`);
});

//app.use('/', (req, res) => {
//    res.render('index', {
//        App,
//        providers: [
//            ROUTER_PROVIDERS,
//            HTTP_PROVIDERS,
//            SERVER_LOCATION_PROVIDERS,
//            provide(BASE_URL, {useValue: '/'}),
//            provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
//        ]
//    });
//});

app.listen(3000, () => {
    console.log('Listen on http://localhost:3000');
});