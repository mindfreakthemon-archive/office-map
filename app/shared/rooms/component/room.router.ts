import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { RoomsList } from './rooms.list';
import { RoomEdit } from './room.edit';
import { RoomAdd } from './room.add';


@Component({
    selector: 'room-route',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'rooms/templates/room.router.jade'
})
@RouteConfig([
    { path: '/list', as: 'RoomsList', component: RoomsList },
    { path: '/room/new', as: 'RoomAdd', component: RoomAdd },
    { path: '/room/:room/edit', as: 'RoomEdit', component: RoomEdit }
])
export class RoomRouter {
}

