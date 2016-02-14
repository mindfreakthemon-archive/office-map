import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminRouter } from '../../admin/components/admin.router';
import { MapRouter } from '../../map/components/map.router';
import { Search } from './search';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/templates/app.jade'
})
@RouteConfig([
    { path: '/', redirectTo: ['/MapRouter', 'Default'] },
    { path: '/admin/...', as: 'AdminRouter', component: AdminRouter},
    { path: '/map/...', as: 'MapRouter', component: MapRouter },
    { path: '/search', as: 'Search', component: Search }
])
export class App {}

