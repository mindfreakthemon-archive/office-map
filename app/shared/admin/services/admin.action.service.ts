import { Component, EventEmitter } from 'angular2/core';

export enum AdminAction {
    NONE,
    ADD_SEAT,
    ADD_WORKER,
    ADD_ROOM,
    CREATE_LINE,
    CREATE_ARC,
    DELETE
}

@Component({})
export class AdminActionService {
    public static actionEmitter = new EventEmitter<AdminAction>();
    public static workerEmitter = new EventEmitter();
    public static roomEmitter = new EventEmitter();

    setAction(action: AdminAction) {
        AdminActionService.actionEmitter.emit(action);
    }

    setWorker(workerId: string) {
        AdminActionService.workerEmitter.emit(workerId);
    }

    setRoom(roomId: string) {
        AdminActionService.roomEmitter.emit(roomId);
    }

    getWorkerEmitter() {
        return AdminActionService.workerEmitter;
    }

    getRoomEmitter() {
        return AdminActionService.roomEmitter;
    }

    getEmitter() {
        return AdminActionService.actionEmitter;
    }
}
