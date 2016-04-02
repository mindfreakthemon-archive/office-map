import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';

import { WorkerService } from '../../workers/services/worker.service';
import { RoomService } from '../../rooms/services/room.service';
import { Worker } from '../../workers/models/worker';
import { Room } from '../../rooms/models/room';

@Component({
    selector: 'floor-toolbar',
    templateUrl: 'floors/templates/floor.toobar.jade'
})
export class FloorToolbar {
    action: AdminAction = AdminAction.NONE;
    actions: any = AdminAction;

    getWorkersSubscription: any;
    getRoomsSubscription: any;
    workers: Worker[];
    rooms: Room[];
    currentWorker: string;
    currentRoom: string;

    workerToggle: boolean = false;
    roomToggle: boolean = false;


    constructor(public adminActionService: AdminActionService, private workerService: WorkerService, private roomService: RoomService) {}

    ngOnInit() {
        this.getWorkersSubscription = this.workerService.getAll()
            .subscribe(workers => this.workers = workers);

        this.getRoomsSubscription = this.roomService.getAll()
            .subscribe(rooms => this.rooms = rooms);
    }

    ngOnDestroy() {
        this.getRoomsSubscription.unsubscribe();
        this.getWorkersSubscription.unsubscribe();
    }

    changeCurrentWorker(event) {
        this.currentWorker = event.target.classList[0];
        this.adminActionService.setWorker(this.currentWorker);
    }

    changeCurrentRoom(event) {
        this.currentRoom = event.target.classList[0];
        this.adminActionService.setRoom(this.currentRoom);
    }

    changeAction(action: AdminAction) {
        this.action = action;
        this.adminActionService.setAction(action);
    }
}
