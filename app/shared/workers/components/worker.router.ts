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
    // @TODO probably edit goes here
])
export class WorkerRouter {
    constructor() {}
}
