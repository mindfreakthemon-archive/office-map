import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { RoomList } from './room.list';
import { RoomEdit } from './room.edit';
import { RoomAdd } from './room.add';


@Component({
    selector: 'room-route',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'rooms/templates/room.router.jade'
})
@RouteConfig([
    { path: '/list', as: 'RoomList', component: RoomList },
    { path: '/room/meeting/new', as: 'MeetingRoomAdd', component: RoomAdd, data: { type: 'meeting' } },
    { path: '/room/team/new', as: 'TeamRoomAdd', component: RoomAdd, data: { type: 'team' } },
    { path: '/room/utility/new', as: 'UtilityRoomAdd', component: RoomAdd, data: { type: 'utility' } },
    { path: '/room/:room/edit', as: 'RoomEdit', component: RoomEdit }
])
export class RoomRouter {
}

