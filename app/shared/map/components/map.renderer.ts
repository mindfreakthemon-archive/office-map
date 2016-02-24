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
    templateUrl: 'map/templates/map.renderer.jade',
    directives: [MapCanvas]
})
export class MapRenderer {
    workerId: string;
    roomId: string;
    floorNumber: string;

    worker: Worker;
    room: Room;
    floor: Floor;

    constructor(private floorService: FloorService,
                private workerService: WorkerService,
                private routeParams: RouteParams,
                private roomService: RoomService) {
        if (routeParams.get('worker')) {
            this.workerId = routeParams.get('worker');
        }

        if (routeParams.get('room')){
            this.roomId = routeParams.get('room');
        }

        if (routeParams.get('floor')) {
            this.floorNumber = routeParams.get('floor');
        }

        this.workerId && this.floorService.getFloorByWorkerId(this.workerId)
            .subscribe(floor => this.floorNumber = floor.number);

        this.workerId && this.floorNumber && this.workerService.get(this.workerId)
            .subscribe(worker => this.worker = worker);

        this.roomId && this.roomService.searchById(this.roomId)
            .subscribe(room => {
                if (room.floor) {
                    this.floorNumber = room.floor;
                    this.room = room;
                }
            });

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
    }
}
