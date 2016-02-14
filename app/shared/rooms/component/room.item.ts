import { Component, Input } from 'angular2/core';

import { Room } from '../models/room';


@Component({
    selector: 'room-item',
    templateUrl: 'rooms/templates/room.item.jade'
})
export class RoomItem {
    @Input() room: Room;
}