import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { MapCanvas } from './map.canvas';
import { WorkerService } from '../../workers/services/worker.service';
import { Worker } from '../../workers/models/worker';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';


@Component({
    templateUrl: 'map/templates/map.renderer.jade',
    directives: [MapCanvas]
})
export class MapRenderer {
    workerId: number;
    floorNumber: number;

    worker: Worker;
    floor: Floor;

    constructor(private floorService: FloorService,
                private workerService: WorkerService,
                private routeParams: RouteParams) {
        if (routeParams.get('worker')) {
            this.workerId = +routeParams.get('worker');
        }

        if (routeParams.get('floor')) {
            this.floorNumber = +routeParams.get('floor');
        }

        this.floorService.get(this.floorNumber)
            .subscribe(
                floor => this.floor = floor,
                error => error,
                () => {
                    if (!this.floor) {
                        this.floorService.first()
                            .subscribe(floor => this.floor = floor);
                    }
                }
            );

        this.workerService.get(this.workerId)
            .subscribe(worker => this.worker = worker);
    }
}
