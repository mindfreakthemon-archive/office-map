import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from './admin.toolbar';
import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';
import { FloorForm } from './floor.form';

@Component({
    selector: 'floor-edit',
    templateUrl: 'admin/templates/floor.edit.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, FloorForm]
})
export class FloorEdit {
    floor: Floor;

    constructor(floorService: FloorService, routeParams: RouteParams) {
        let floorNumber = +routeParams.get('floor');

        floorService.get(floorNumber)
            .subscribe(floor => this.floor = floor);
    }
}
