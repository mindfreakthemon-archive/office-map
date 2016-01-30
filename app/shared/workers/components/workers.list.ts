import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { WorkerService } from '../services/worker.service';
import { Worker } from '../models/worker';


@Component({
    selector: 'workers-list',
    templateUrl: '/workers/templates/workers.list.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar]
})
export class WorkersList {
    workers: Worker[];

    constructor(public workerService: WorkerService) {
        this.workerService.getAll()
            .subscribe(workers => this.workers = workers);
    }

    deleteWorker(worker: Worker) {
        this.workerService.remove(worker);
    }
}
