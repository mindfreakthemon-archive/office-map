import { EventEmitter, Component, Input, Output } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Floor } from '../models/floor';
import { FloorService } from '../services/floor.service';

@Component({
    selector: 'floor-form',
    templateUrl: 'floors/templates/floor.form.jade'
})
export class FloorForm {
    @Input()
    floor: Floor;
    @Input()
    create: boolean = false;

    @Output()
    complete = new EventEmitter<Floor>();

    constructor(private floorService: FloorService) {
    }

    onSubmit() {
        this.floorService.put(this.floor)
            .subscribe(() => this.complete.emit(this.floor));
    }
}
