import { EventEmitter, Component, Input, Output } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Floor } from '../../map/models/floor';
import { FloorService } from '../../map/services/floor.service';

@Component({
    selector: 'floor-form',
    templateUrl: 'admin/templates/floor.form.jade'
})
export class FloorForm {
    @Input() floor: Floor;
    @Input() create: boolean = false;

    @Output() complete = new EventEmitter<Floor>();

    constructor(private floorService: FloorService) {}

    onSubmit() {
        this.floorService.put(this.floor);

        this.complete.next(this.floor);
    }
}
