import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';
import { WorkerQuickSearch } from '../../staff/components/worker.quick.search';

@Component({
    selector: 'toolbar',
    directives: [ROUTER_DIRECTIVES, WorkerQuickSearch],
    templateUrl: 'app/templates/toolbar.jade'
})
export class Toolbar {
    floors: Floor[];

    constructor(
        public floorService: FloorService
    ) {
        this.floorService.getAll()
            .subscribe(floors => this.floors = floors);
    }
}

