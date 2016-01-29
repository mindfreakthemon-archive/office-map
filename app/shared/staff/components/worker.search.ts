import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { Worker } from '../models/worker';
import { WorkerService } from '../services/worker.service';


@Component({
    selector: 'worker-search',
    templateUrl: 'staff/templates/worker.search.jade',
    directives: [ROUTER_DIRECTIVES, PaginationControlsCmp],
    pipes: [PaginatePipe],
    providers: [PaginationService]
})
export class WorkerSearch {
    query: string = '';
    loading: boolean = true;
    workers: Worker[] = [];

    constructor(public routeParams: RouteParams,
                public workerService: WorkerService) {
        this.query = routeParams.get('query');

        this.workerService.search(this.query)
            .subscribe(workers => {
                this.workers = workers;
                this.loading = false;
            });
    }
}
