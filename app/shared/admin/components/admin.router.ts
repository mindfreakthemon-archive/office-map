import { Component, View } from 'angular2/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminWelcome } from './admin.welcome';

import { FloorRouter } from '../../floors/component/floor.router';
import { WorkerRouter } from '../../workers/components/worker.router';


@Component({
    selector: 'admin',
})
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'admin/templates/admin.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: AdminWelcome },

    { path: '/floors/...', as: 'Floors', component: FloorRouter },
    { path: '/workers/...', as: 'Workers', component: WorkerRouter }
])
export class AdminRouter {
}
