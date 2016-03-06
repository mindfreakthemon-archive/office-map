import { EventEmitter, Component, Input, Output, ChangeDetectionStrategy } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
    selector: 'room-form',
    templateUrl: 'rooms/templates/room.form.jade'
})
export class RoomForm {
    @Input() room: Room;
    @Input() create: boolean = false;

    @Output() complete = new EventEmitter<Room>();

    constructor(private roomService: RoomService) {}

    onSubmit() {
        this.roomService.put(this.room);

        this.complete.emit(this.room);
    }
}
