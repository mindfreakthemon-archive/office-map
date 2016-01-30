import { Component, View } from 'angular2/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminWelcome } from './admin.welcome';
import { FloorsList } from '../../floors/component/floors.list';
import { FloorEdit } from '../../floors/component/floor.edit';
import { FloorAdd } from '../../floors/component/floor.add';
import { FloorConfigure } from '../../floors/component/floor.configure';
import { WorkersList } from '../../workers/components/workers.list';


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
    { path: '/workers', as: 'Workers', component: WorkersList }
])
export class AdminRouter {
}
