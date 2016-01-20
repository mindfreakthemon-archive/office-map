import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Map } from './map';
import { Toolbar } from '../../app/components/toolbar';

@Component({
    selector: 'map-route'
})
@View({
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, Toolbar, Map],
    templateUrl: 'map/templates/map.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: Map },
    { path: '/floor/:floor', as: 'Floor', component: Map }
])
export class MapRouter {
    constructor() {}
}
