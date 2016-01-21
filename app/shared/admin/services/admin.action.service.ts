import { Component, EventEmitter } from 'angular2/core';

export enum AdminAction {
    NONE,
    ADD_SEAT,
    ADD_WORKER,
    ADD_ROOM
}

@Component({})
export class AdminActionService {
    public static actionEmitter = new EventEmitter<AdminAction>();

    setAction(action: AdminAction) {
        AdminActionService.actionEmitter.next(action);
    }

    getEmitter() {
        return AdminActionService.actionEmitter;
    }
}
