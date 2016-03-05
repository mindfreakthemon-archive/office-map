import { EventEmitter, Component, Input, Output, ChangeDetectionStrategy } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Worker } from '../models/worker';
import { WorkerService } from '../services/worker.service';

@Component({
    selector: 'worker-form',
    templateUrl: 'workers/templates/worker.form.jade'
})
export class WorkerForm {
    @Input() worker: Worker;
    @Input() create: boolean = false;

    @Output() complete = new EventEmitter<Worker>();

    genders = Array.from(<any> Worker.GENDER_MAP);
    teams = Array.from(<any> Worker.TEAM_NAMES_MAP);

    constructor(private workerService: WorkerService) {}

    onSubmit() {
        this.workerService.put(this.worker);

        this.complete.emit(this.worker);
    }
}
