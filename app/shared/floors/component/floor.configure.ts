import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { FloorService } from '../services/floor.service';
import { Floor } from '../models/floor';
import { FloorToolbar } from './floor.toolbar';
import { MapCanvas } from '../../map/components/map.canvas';

@Component({
    selector: 'floor-configure',
    templateUrl: 'floors/templates/floor.configure.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, FloorToolbar, MapCanvas]
})
export class FloorConfigure {
    floor: Floor;

    constructor(floorService: FloorService, routeParams: RouteParams) {
        let floorNumber = routeParams.get('floor');

        floorService.get(floorNumber)
            .subscribe(floor => this.floor = floor);
    }
}
