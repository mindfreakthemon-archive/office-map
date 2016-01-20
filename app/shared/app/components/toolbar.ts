import { CORE_DIRECTIVES, Component, Input, Output, EventEmitter } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { FloorService } from '../../map/services/floor.service';
import { Floor } from '../../map/models/floor';
import { AdminTools } from '../../admin/components/admin.tools';


@Component({
    selector: 'toolbar',
    providers: [FloorService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, AdminTools],
    templateUrl: 'app/templates/toolbar.jade'
})
export class Toolbar {
    floors: Floor[];

    @Input() tools: boolean = false;
    @Output() typeChange = new EventEmitter();

    constructor(public floorService: FloorService) {
        this.floorService.getFloors()
            .then(floors => this.floors = floors);
    }

    onTypeChange(entityType: string) {
        this.typeChange.next(entityType);
    }
}

