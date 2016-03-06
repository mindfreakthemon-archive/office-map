import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { RoomForm } from './room.form';

@Component({
    selector: 'room-edit',
    templateUrl: 'rooms/templates/room.edit.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, RoomForm]
})
export class RoomEdit {
    room: Room;

    constructor(roomService: RoomService, routeParams: RouteParams) {
        let id = routeParams.get('room');

        roomService.get(id)
            .subscribe(room => this.room = room);
    }
}
