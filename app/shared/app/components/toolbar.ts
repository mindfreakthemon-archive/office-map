import { Component, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { QuickSearch } from './quick.search';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';

@Component({
    selector: 'toolbar',
    directives: [ROUTER_DIRECTIVES, QuickSearch],
    templateUrl: 'app/templates/toolbar.jade'
})
export class Toolbar {
    floors: Floor[];

    @Input() showQuickSearch: boolean = true;

    constructor(
        public floorService: FloorService
    ) {
        this.floorService.getAll()
            .subscribe(floors => this.floors = floors);
    }
}

