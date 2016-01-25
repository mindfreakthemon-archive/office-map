import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Worker } from '../models/worker';
import { WorkerService } from '../services/worker.service';


@Component({
    selector: 'worker-search',
    templateUrl: 'staff/templates/worker.search.jade',
    providers: [WorkerService]
})
export class WorkerSearch {
    query: string = '';
    loading: boolean = true;
    workers: Worker[] = [];

    constructor(
        public routeParams: RouteParams,
        public workerService: WorkerService
    ) {
        this.query = routeParams.get('query');

        setTimeout(() => {
            this.workerService.getWorkers()
                .then(workers => this.workers = workers)
                .then(loading => this.loading = false);
        }, 500); // just for tests
    }
}
