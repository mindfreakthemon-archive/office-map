import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { FloorList } from './floor.list';
import { FloorEdit } from './floor.edit';
import { FloorAdd } from './floor.add';
import { FloorConfigure } from './floor.configure';


@Component({
    selector: 'floor-route',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'workers/templates/worker.router.jade'
})
@RouteConfig([
    { path: '/list', as: 'FloorList', component: FloorList },
    { path: '/floor/new', as: 'FloorAdd', component: FloorAdd },
    { path: '/floor/:floor/edit', as: 'FloorEdit', component: FloorEdit },
    { path: '/floor/:floor/configure', as: 'FloorConfigure', component: FloorConfigure },
])
export class FloorRouter {
}
