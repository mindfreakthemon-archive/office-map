import { Component, View } from 'angular2/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminWelcome } from './admin.welcome';
import { FloorsList } from './floors.list';


@Component({
    selector: 'admin',
})
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'admin/templates/admin.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: AdminWelcome },
    { path: '/floors', as: 'Floors', component: FloorsList },
    //{ path: '/floor/new', as: 'FloorAdd', component: FloorAdd },
    //{ path: '/floor/:floor', as: 'FloorEdit', component: FloorEdit },
    //{ path: '/worker/:worker', as 'WorkerEdit', component: WorkerEdit }
])
export class AdminRouter {
}
