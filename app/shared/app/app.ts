import { Component, Directive, View, ElementRef, Renderer } from 'angular2/angular2';
import { Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { Home } from '../home/home';
import { Admin } from '../admin/admin';
import { Map } from '../map/map';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/app.jade'
})
@RouteConfig([
    { path: '/', redirectTo: '/home' },
    { path: '/home', as: 'Home', component: Home },
    { path: '/admin', as: 'Admin', component: Admin },
    { path: '/map', as: 'Map', component: Map }
])
export class App {
    constructor() {}
}

