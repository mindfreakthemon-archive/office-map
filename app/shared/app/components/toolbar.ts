import { CORE_DIRECTIVES, Component } from 'angular2/angular2';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';

@Component({
    selector: 'toolbar',
    providers: [FloorService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'app/templates/toolbar.jade'
})
export class Toolbar {
    floors:Floor[];

    constructor(public floorService: FloorService) {
        this.floorService.getFloors()
            .then(floors => this.floors = floors);
    }
}

