import { Component, EventEmitter } from 'angular2/core';

export enum AdminAction {
    NONE,
    ADD_SEAT,
    ADD_WORKER,
    ADD_ROOM,
    CREATE_LINE,
    CREATE_ARC
}

@Component({})
export class AdminActionService {
    public static actionEmitter = new EventEmitter<AdminAction>();
    public static workerEmitter = new EventEmitter();

    setAction(action: AdminAction) {
        AdminActionService.actionEmitter.next(action);
    }

    setWorker(workerId: string) {
        AdminActionService.workerEmitter.next(workerId);
    }

    getWorkerEmitter() {
        return AdminActionService.workerEmitter;
    }

    getEmitter() {
        return AdminActionService.actionEmitter;
    }
}
