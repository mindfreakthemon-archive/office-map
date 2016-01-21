import { COMMON_DIRECTIVES } from 'angular2/common';
import { Component, View } from 'angular2/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Map } from './map';
import { Toolbar } from '../../app/components/toolbar';

@Component({
    selector: 'map-route'
})
@View({
    directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, Toolbar, Map],
    templateUrl: 'map/templates/map.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: Map },
    { path: '/floor/:floor', as: 'Floor', component: Map }
])
export class MapRouter {
    constructor() {}
}
