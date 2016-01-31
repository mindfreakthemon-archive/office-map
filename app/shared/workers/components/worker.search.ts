import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { Worker } from '../models/worker';
import { WorkerService } from '../services/worker.service';
import { WorkerItem } from './worker.item';


@Component({
    selector: 'worker-search',
    templateUrl: 'workers/templates/worker.search.jade',
    directives: [ROUTER_DIRECTIVES, PaginationControlsCmp, WorkerItem],
    pipes: [PaginatePipe],
    providers: [PaginationService]
})
export class WorkerSearch {
    query: string = '';
    workers: Worker[];

    constructor(public routeParams: RouteParams,
                public workerService: WorkerService) {
        this.query = routeParams.get('query');

        this.workerService.search(this.query)
            .subscribe(workers => this.workers = workers);
    }
}
