import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteParams } from 'angular2/router';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Map } from './map';

@Component({
    selector: 'map-route'
})
@View({
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, Map],
    template: '<router-outlet></router-outlet>'
})
@RouteConfig([
    { path: '/', as: 'Default', component: Map },
    { path: '/floor/:floor', as: 'Floor', component: Map }
])
export class MapRouter {
    constructor() {}
}
