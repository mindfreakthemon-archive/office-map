import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { WorkerList } from './worker.list';
import { WorkerEdit } from './worker.edit';
import { WorkerAdd } from './worker.add';


@Component({
    selector: 'worker-route',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'workers/templates/worker.router.jade'
})
@RouteConfig([
    { path: '/list', as: 'WorkerList', component: WorkerList },
    { path: '/worker/new', as: 'WorkerAdd', component: WorkerAdd },
    { path: '/worker/:worker/edit', as: 'WorkerEdit', component: WorkerEdit }
])
export class WorkerRouter {
}

