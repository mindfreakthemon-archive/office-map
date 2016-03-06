import { Component } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { Room } from '../models/room';
import { RoomForm } from './room.form';

@Component({
    selector: 'room-add',
    templateUrl: 'rooms/templates/room.add.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, RoomForm]
})
export class RoomAdd {
    room: Room = new Room();

    constructor(private router: Router) {}

    onComplete(room: Room) {
        this.router.navigate(['/AdminRouter', 'Rooms', 'RoomEdit', { room: this.room.id }]);
    }
}
