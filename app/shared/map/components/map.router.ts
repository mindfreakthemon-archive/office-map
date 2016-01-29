import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { MapCanvas } from './map.canvas';
import { Toolbar } from '../../app/components/toolbar';

@Component({
    selector: 'map-route',
    directives: [ROUTER_DIRECTIVES, Toolbar, MapCanvas],
    templateUrl: 'map/templates/map.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: MapCanvas },
    { path: '/floor/:floor', as: 'Floor', component: MapCanvas },
    { path: '/locate/:worker', as: 'WorkerLocate', component: MapCanvas }
])
export class MapRouter {
    constructor() {}
}
