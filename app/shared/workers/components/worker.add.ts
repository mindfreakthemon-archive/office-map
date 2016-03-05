import { Component } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { Worker } from '../models/worker';
import { WorkerForm } from './worker.form';

@Component({
    selector: 'worker-add',
    templateUrl: 'workers/templates/worker.add.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, WorkerForm]
})
export class WorkerAdd {
    worker: Worker = new Worker();

    constructor(private router: Router) {}

    onComplete(worker: Worker) {
        this.router.navigate(['/AdminRouter', 'Workers', 'WorkerEdit', { worker: this.worker.id }]);
    }
}
