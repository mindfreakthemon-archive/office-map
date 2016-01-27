import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { Map } from './map';
import { Toolbar } from '../../app/components/toolbar';

@Component({
    selector: 'map-route',
    directives: [ROUTER_DIRECTIVES, Toolbar, Map],
    templateUrl: 'map/templates/map.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: Map },
    { path: '/floor/:floor', as: 'Floor', component: Map },
    { path: '/locate/:worker', as: 'WorkerLocate', component: Map }
])
export class MapRouter {
    constructor() {}
}
