import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from './admin.toolbar';
import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';


@Component({
    selector: 'floors-list',
    templateUrl: '/admin/templates/floors.list.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar]
})
export class FloorsList {
    floors: Floor[];

    constructor(
        public floorService: FloorService
    ) {
        this.floorService.$stream
            .subscribe(floors => this.floors = floors);
        this.floorService.load();
    }

    deleteFloor(floor: Floor) {
        this.floorService.remove(floor);
    }
}
