import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { Room } from '../models/room';
import { RoomSearch } from './room.search';


@Component({
    selector: 'rooms-list',
    templateUrl: '/rooms/templates/rooms.list.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, RoomSearch]
})
export class RoomsList {
}
