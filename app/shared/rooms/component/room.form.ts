import { EventEmitter, Component, Input, Output } from 'angular2/core';

import { Room, RoomType } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
    selector: 'room-form',
    templateUrl: 'rooms/templates/room.form.jade'
})
export class RoomForm {
    @Input()
    room: Room;
    @Input()
    create: boolean = false;

    @Output()
    complete = new EventEmitter<Room>();

    roomTypes = RoomType;

    constructor(private roomService: RoomService) {
    }

    onSubmit() {
        this.roomService.put(this.room)
            .subscribe(() => this.complete.emit(this.room));

    }
}
