import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Floor } from '../models/floor';
import { FloorService } from '../services/floor.service';


@Component({
    selector: 'floor-item',
    templateUrl: 'floors/templates/floor.item.jade',
    directives: [ROUTER_DIRECTIVES]
})
export class FloorItem {
    @Input()
    floor: Floor;

    @Input()
    adminMode: boolean = false;

    @Output()
    onItemDeleted = new EventEmitter<Floor>();

    @Output()
    onSeatsCleaned = new EventEmitter<Floor>();
    
    
    constructor(public floorService: FloorService) {
    }

    deleteFloor() {
        if (confirm('Are you sure?')) {
            this.floorService.remove(this.floor)
                .subscribe(() => this.onItemDeleted.emit(this.floor));
        }
    }
    
    cleanSeats() {
        if (confirm('Are you sure?')) {
            this.floor.seats
                .forEach(seat => seat.worker = null);

            this.floorService.put(this.floor)
                .subscribe(() => this.onSeatsCleaned.emit(this.floor));
        }
    }
}
