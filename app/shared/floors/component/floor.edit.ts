import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { FloorService } from '../services/floor.service';
import { Floor } from '../models/floor';
import { FloorForm } from './floor.form';

@Component({
    selector: 'floor-edit',
    templateUrl: 'floors/templates/floor.edit.jade',
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
