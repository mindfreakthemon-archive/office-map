import { Component } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES, RouteData } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { Room } from '../models/room';
import { RoomForm } from './room.form';
import { MeetingRoom } from '../models/meeting.room';
import { UtilityRoom } from '../models/utility.room';
import { TeamRoom } from '../models/team.room';

@Component({
    selector: 'room-add',
    templateUrl: 'rooms/templates/room.add.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, RoomForm]
})
export class RoomAdd {
    room: Room;

    constructor(private router: Router, private data: RouteData) {
        switch (data.get('type')) {
            case 'meeting':
                this.room = new MeetingRoom();
                break;

            case 'utility':
                this.room = new UtilityRoom();
                break;

            case 'team':
                this.room = new TeamRoom();
                break;

            default:
                // as a backward compatibility
                this.room = new MeetingRoom();
        }
    }

    onComplete(room: Room) {
        this.router.navigate(['/AdminRouter', 'Rooms', 'RoomEdit', { room: this.room.id }]);
    }
}
