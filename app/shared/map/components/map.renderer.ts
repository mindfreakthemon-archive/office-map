import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { MapCanvas } from './map.canvas';
import { WorkerService } from '../../workers/services/worker.service';
import { RoomService } from '../../rooms/services/room.service';
import { Worker } from '../../workers/models/worker';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';
import { Room } from '../../rooms/models/room';


@Component({
    selector: 'map-renderer',
    templateUrl: 'map/templates/map.renderer.jade',
    directives: [MapCanvas]
})
export class MapRenderer {
    worker: Worker;
    room: Room;
    floor: Floor;

    constructor(private floorService: FloorService,
                private workerService: WorkerService,
                private routeParams: RouteParams,
                private roomService: RoomService) {

        if (routeParams.get('worker')) {
            this.floorService
                .getFloorByWorkerId(routeParams.get('worker'))
                .subscribe(floor => {
                    this.workerService
                        .get(routeParams.get('worker'))
                        .subscribe(worker => {
                            this.worker = worker;
                            this.floor = floor;
                        });
                });
        } else if (routeParams.get('room')) {
            this.floorService
                .getFloorByRoomId(routeParams.get('room'))
                .subscribe(floor => {
                    this.roomService
                        .get(routeParams.get('room'))
                        .subscribe(room => {
                            this.room = room;
                            this.floor = floor;
                        });
                });
        } else if (routeParams.get('floor')) {
            this.floorService
                .get(routeParams.get('floor'))
                .subscribe(floor => this.floor = floor);
        } else {
            this.floorService
                .first()
                .subscribe(floor => this.floor = floor);
        }

    }
}
