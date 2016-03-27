import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { FloorService } from '../services/floor.service';
import { Floor } from '../models/floor';
import { Omit } from '../../app/pipes/omit';


@Component({
    selector: 'floor-copy',
    templateUrl: 'floors/templates/floor.copy.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar],
    pipes: [Omit]
})
export class FloorCopy {
    floors: Floor[];

    sourceFloorNumber = '';
    destinationFloorNumber = '';

    constructor(private floorService: FloorService, private router: Router) {
        floorService.getAll()
            .subscribe(floors => this.floors = floors);
    }

    onSubmit() {
        let sourceFloor = this.floors.find(floor => floor.number === this.sourceFloorNumber);
        let destinationFloor = this.floors.find(floor => floor.number === this.destinationFloorNumber);

        if (!sourceFloor || !destinationFloor) {
            return;
        }

        let floor = new Floor(sourceFloor.toJSON());

        floor.number = destinationFloor.number;

        this.floorService.put(floor)
            .subscribe(() => this.router.navigate(['/AdminRouter', 'Floors', 'FloorConfigure', { floor: destinationFloor.number }]));
    }
}
