import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';

import { WorkerService } from '../../workers/services/worker.service';
import { RoomService } from '../../rooms/services/room.service';
import { Worker } from '../../workers/models/worker';

@Component({
    selector: 'floor-toolbar',
    templateUrl: 'floors/templates/floor.toobar.jade'
})
export class FloorToolbar {
    action: AdminAction = AdminAction.NONE;
    actions: any = AdminAction;

    getWorkersSubscription: any;
    workers: Worker[];
    currentWorker: string;

    constructor(public adminActionService: AdminActionService, private workerService: WorkerService) {}

    ngOnInit() {
        this.getWorkersSubscription = this.workerService.getAll()
            .subscribe(workers => {
                this.workers = workers
            });
    }

    toggleDropdown() {
        document.getElementsByTagName('floor-toolbar')[0].classList.toggle('open');
    }

    changeCurrentWorker(event) {
        this.currentWorker = event.target.classList[0];
        this.adminActionService.setWorker(this.currentWorker);
    }

    changeAction(action: AdminAction) {
        this.action = action;
        this.adminActionService.setAction(action);
    }
}
