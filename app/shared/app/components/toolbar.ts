import { COMMON_DIRECTIVES } from 'angular2/common';
import { Component, View, Input, Output, EventEmitter } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';
import { AdminTools } from '../../admin/components/admin.tools';

@Component({
    selector: 'toolbar',
    providers: [FloorService]
})
@View({
    directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, AdminTools],
    templateUrl: 'app/templates/toolbar.jade'
})
export class Toolbar {
    floors: Floor[];

    @Input() tools: boolean = false;
    @Output() typeChange = new EventEmitter();

    constructor(public floorService: FloorService) {
        this.floorService.getFloors()
            .then(floors => this.floors = floors);
    }

    onTypeChange(entityType: string) {
        this.typeChange.next(entityType);
    }
}

