import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';


@Component({
    selector: 'floor-toolbar',
    templateUrl: 'floors/templates/floor.toobar.jade'
})
export class FloorToolbar {
    action: AdminAction = AdminAction.NONE;
    actions: any = AdminAction;

    constructor(public adminActionService: AdminActionService) {};

    changeAction(action: AdminAction) {
        this.action = action;
        this.adminActionService.setAction(action);
    }
}
