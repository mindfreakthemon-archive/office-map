import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { WorkerQuickSearch } from '../../workers/components/worker.quick.search';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';

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

