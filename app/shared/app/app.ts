import { Component } from 'angular2/angular2';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Admin } from '../admin/admin';
import { Map } from '../map/map';
import { Toolbar } from './components/toolbar';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES, Toolbar],
    templateUrl: 'app/app.jade'
})
@RouteConfig([
    { path: '/', redirectTo: '/map' },
    { path: '/admin', as: 'Admin', component: Admin },
    { path: '/map/:number', as: 'Map', component: Map }
])
export class App {
    constructor() {}
}

