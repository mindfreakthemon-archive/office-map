import { Component } from 'angular2/angular2';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Admin } from '../admin/admin';
import { Map } from '../map/components/map';
import { MapRouter } from '../map/components/map.router';
import { Toolbar } from './components/toolbar';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES, Toolbar],
    templateUrl: 'app/app.jade'
})
@RouteConfig([
    { path: '/', redirectTo: '/map' },
    { path: '/admin', as: 'Admin', component: Admin },
    { path: '/map/...', as: 'MapRouter', component: MapRouter }
])
export class App {
    constructor() {}
}

