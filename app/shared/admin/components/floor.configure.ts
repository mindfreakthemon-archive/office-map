import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from './admin.toolbar';
import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';
import { FloorToolbar } from './floor.toolbar';

@Component({
    selector: 'floor-configure',
    templateUrl: 'admin/templates/floor.configure.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, FloorToolbar]
})
export class FloorConfigure {
    floor: Floor;

    constructor(floorService: FloorService, routeParams: RouteParams) {
        let floorNumber = +routeParams.get('floor');

        floorService.get(floorNumber)
            .subscribe(floor => this.floor = floor);
    }
}
