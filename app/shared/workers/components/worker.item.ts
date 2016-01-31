import { Component, Input } from 'angular2/core';

import { Worker } from '../models/worker';


@Component({
    selector: 'worker-item',
    templateUrl: 'workers/templates/worker.item.jade'
})
export class WorkerItem {
    @Input() worker: Worker;
}