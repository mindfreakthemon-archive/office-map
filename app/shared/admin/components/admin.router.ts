import { Component, View } from 'angular2/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminWelcome } from './admin.welcome';
import { FloorsList } from './floors.list';
import { FloorEdit } from './floor.edit';
import { FloorAdd } from './floor.add';
import { FloorConfigure } from './floor.configure';


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
    { path: '/floor/new', as: 'FloorAdd', component: FloorAdd },
    { path: '/floor/:floor/edit', as: 'FloorEdit', component: FloorEdit },
    { path: '/floor/:floor/configure', as: 'FloorConfigure', component: FloorConfigure },
    //{ path: '/worker/:worker', as 'WorkerEdit', component: WorkerEdit }
])
export class AdminRouter {
}
