import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { MapCanvas } from './map.canvas';
import { Toolbar } from '../../app/components/toolbar';
import {MapRenderer} from './map.renderer';

@Component({
    selector: 'map-route',
    directives: [ROUTER_DIRECTIVES, Toolbar, MapCanvas],
    templateUrl: 'map/templates/map.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: MapRenderer },
    { path: '/floor/:floor', as: 'Floor', component: MapRenderer },
    { path: '/locate/:worker', as: 'WorkerLocate', component: MapRenderer }
])
export class MapRouter {}
