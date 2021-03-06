import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Worker } from '../models/worker';
import { WorkerService } from '../services/worker.service';


@Component({
    selector: 'worker-item',
    templateUrl: 'workers/templates/worker.item.jade',
    directives: [ROUTER_DIRECTIVES]
})
export class WorkerItem {
    @Input()
    worker: Worker;

    @Input()
    adminMode: boolean = false;

    @Output()
    onItemDeleted = new EventEmitter<Worker>();

    constructor(public workerService: WorkerService) {
    }

    deleteWorker(worker: Worker) {
        this.workerService.remove(worker)
            .subscribe(() => this.onItemDeleted.emit(worker));
    }
}
