import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import { WorkerSearch } from './worker.search';

import { Toolbar } from '../../app/components/toolbar';


@Component({
    selector: 'worker-route',
    directives: [ROUTER_DIRECTIVES, Toolbar],
    templateUrl: 'workers/templates/worker.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: WorkerSearch }
])
export class WorkerRouter {
    constructor() {}
}
