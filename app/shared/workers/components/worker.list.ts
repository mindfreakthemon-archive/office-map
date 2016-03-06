import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { Worker } from '../models/worker';
import { WorkerSearch } from './worker.search';


@Component({
    selector: 'workers-list',
    templateUrl: '/workers/templates/worker.list.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, WorkerSearch]
})
export class WorkerList {
}
