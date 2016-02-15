import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import * as L from 'leaflet';
import 'leaflet-curve';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';
import { Worker } from '../../workers/models/worker';
import { Wall } from '../models/wall';
import { WorkerService } from '../../workers/services/worker.service';


@Component({
    selector: 'map-canvas',
    templateUrl: 'map/templates/map.jade'
})
export class MapCanvas {
    @Input() floor: Floor;

    /**
     * Worker to highlight
     */
    @Input() worker: Worker;

    clickAction: AdminAction = AdminAction.NONE;
    adminActionSubscription: any;
    getWorkersSubscription: any;
    workers: Worker[];
    wall: Wall;

    private map;

    constructor(private adminActionService: AdminActionService, public workerService: WorkerService) {}

    ngOnInit() {
        this.initMap();
        this.buildMap(this.floor);

        // if this.worker then locateWorker(this.worker)

        this.adminActionSubscription = this.adminActionService.getEmitter()
            .subscribe(action => this.clickAction = action);

        this.getWorkersSubscription = this.workerService.getAll()
            .subscribe(workers => {
                this.workers = workers
            });
    }

    ngOnDestroy() {
        this.adminActionSubscription.unsubscribe();
        this.getWorkersSubscription.unsubscribe();
    }

    initMap() {
        document.getElementById('mapContainer').innerHTML = '<div id="map"></div>';
        this.map = L.map('map', { zoomControl: false })
            .setView([39.5, -8.5], 7);

        new L.Control.Zoom({ position: 'bottomleft' })
            .addTo(this.map);
        let dot, line, polygon;

        let onMapClick = (e) => {
            switch(this.clickAction) {
                case 0:
                    break;
                case 1:
                    let point = { "x": e.latlng.lat, "y": e.latlng.lng };
                    this.floor.addSeat(point);
                    this.drawSeat(point, this.map);
                    break;
                case 3:
                    alert("You clicked the map at 3" + e.latlng);
                    break;
            }
        };

        this.map.on('click', onMapClick);

        L.tileLayer('http://www.colorcombos.com/images/colors/FFFFFF.png', { maxZoom: 12, id: 'random' })
            .addTo(this.map);
    }

    buildMap(floor: Floor) {
        if (floor.seats) {
            floor.seats.map((seat) => {
                this.drawSeat(seat, this.map);
            });
        }

        if (floor.walls){
            floor.walls.map(wall => {
                switch (wall.type) {
                    case 'arc':
                        this.drawArc(wall, this.map);
                        break;
                    case 'line':
                        this.drawLine(wall, this.map);
                        break;
                }
            })
        }
    }

    drawSeat(seat, map) {
        let latlng = new L.LatLng(seat.x, seat.y);
        let seat = L.circle(latlng, 5000)
            .addTo(this.map);

        seat.on('click', (e) => {
            if (this.clickAction === 2){
                seat.bindPopup("worker: " + this.workers[0]['firstName']).openPopup();
            }
        });
    }

    drawArc(wall, map) {
        L.curve(
            [
            'M',[wall.start.x, wall.start.y],
            'C',[wall.start.x, wall.start.y], [wall.vertex.x, wall.vertex.y], [wall.end.x, wall.end.y],
            'T',[wall.end.x, wall.end.y]
            ],
            {color:wall.color}
        ).addTo(map);
    }

    drawLine(wall, map) {
        let start = new L.LatLng(wall.start.x, wall.start.y);
        let end = new L.LatLng(wall.end.x, wall.end.y);

        L.polyline([start, end], {color: wall.color}).addTo(map);
    }
}
