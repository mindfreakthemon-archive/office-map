import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { WorkerService } from '../services/worker.service';
import { Worker } from '../models/worker';
import { WorkerForm } from './worker.form';

@Component({
    selector: 'worker-edit',
    templateUrl: 'workers/templates/worker.edit.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, WorkerForm]
})
export class WorkerEdit {
    worker: Worker;

    constructor(workerService: WorkerService, routeParams: RouteParams) {
        let id = routeParams.get('worker');

        workerService.get(id)
            .subscribe(worker => this.worker = worker);
    }
}
