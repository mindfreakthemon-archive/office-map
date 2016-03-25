import { Component, Input, EventEmitter, Output } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Room } from '../models/room';
import { RoomService } from '../services/room.service';


@Component({
    selector: 'room-item',
    templateUrl: 'rooms/templates/room.item.jade',
    directives: [ROUTER_DIRECTIVES]
})
export class RoomItem {
    @Input()
    room: Room;
    
    @Input()
    adminMode: boolean = false;
    
    @Output()
    onItemDeleted = new EventEmitter<Room>();

    constructor(public roomService: RoomService) {
    }

    deleteRoom(room: Room) {
        this.roomService.remove(room)
            .subscribe(() => this.onItemDeleted.emit(room));
    }
}
