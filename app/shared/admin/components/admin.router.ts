import { Component, View } from 'angular2/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminWelcome } from './admin.welcome';
import { AdminLogin } from './admin.login';

import { FloorRouter } from '../../floors/component/floor.router';
import { WorkerRouter } from '../../workers/components/worker.router';
import { RoomRouter } from '../../rooms/component/room.router';
import { AdminLoginRouterOutlet } from './admin.login.router.outlet';


@Component({
    selector: 'admin',
})
@View({
    directives: [ROUTER_DIRECTIVES, AdminLoginRouterOutlet],
    templateUrl: 'admin/templates/admin.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: AdminWelcome },

    { path: '/floors/...', as: 'Floors', component: FloorRouter },
    { path: '/workers/...', as: 'Workers', component: WorkerRouter },
    { path: '/rooms/...', as: 'Rooms', component: RoomRouter },

    { path: '/login', as: 'Login', component: AdminLogin }
])
export class AdminRouter {
}
