import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteData, Router } from 'angular2/router';

import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';
import { AdminTools } from '../../admin/components/admin.tools';

@Component({
    selector: 'toolbar',
    providers: [FloorService],
    directives: [ROUTER_DIRECTIVES, AdminTools],
    templateUrl: 'app/templates/toolbar.jade'
})
export class Toolbar {
    floors: Floor[];

    displayAdminTools: boolean = false;

    constructor(public floorService: FloorService, routeData: RouteData) {
        this.displayAdminTools = routeData.get('admin');

        this.floorService.getFloors()
            .then(floors => this.floors = floors);
    }
}

