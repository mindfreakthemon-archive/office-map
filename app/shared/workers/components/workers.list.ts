import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { WorkerService } from '../services/worker.service';
import { Worker } from '../models/worker';


@Component({
    selector: 'workers-list',
    templateUrl: '/workers/templates/workers.list.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, PaginationControlsCmp],
    pipes: [PaginatePipe],
    providers: [PaginationService]
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
