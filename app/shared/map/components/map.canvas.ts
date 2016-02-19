import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import * as L from 'leaflet';
import 'leaflet-curve';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';
import { Worker } from '../../workers/models/worker';
import { Wall } from '../models/wall';
import { Seat } from '../models/seat';
import { Point } from '../models/point';
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

        this.map.on('click', this.onMapClick.bind(this));

        L.tileLayer('http://www.colorcombos.com/images/colors/FFFFFF.png', { maxZoom: 12, id: 'random' })
            .addTo(this.map);
    }

    onMapClick(e) {
        switch(this.clickAction) {
            case 0:
                break;
            case 1:
                this.floor.addSeat(e.latlng);
                this.drawSeat(this.floor.lastSeat());
                break;
            case 3:
                alert("You clicked the map at 3" + e.latlng);
                break;
        }
    }

    buildMap(floor: Floor) {
        this.floor.seats.map((seat) => {
            this.drawSeat(seat);
        });

        floor.walls.map(wall => {
            this.drawWall(wall);
        })
    }

    drawSeat(seat: Seat) {
        let latlng = new L.LatLng(seat.position.x, seat.position.y),
        seatOnMap = L.circleMarker(latlng)
            .addTo(this.map),
        onSeatClick = (e) => {
            if (this.clickAction === 2 && !seat.worker){
                this.floor.setWorkerOnSeat(seat,this.workers[0]);
                this.map.removeLayer(seatOnMap);
                this.drawSeat(seat);
            }
        };

        if (seat.worker){
            seatOnMap.setStyle({color: 'red'});
            seatOnMap.bindPopup(`worker: ${seat.worker['firstName']}<br>lastName: ${seat.worker['lastName']}`);
        }

        seatOnMap.on('click', onSeatClick);
    }



    drawWall(wall: Wall) {
        switch(wall.type) {
            case 'line':
                this.drawLine(wall);
                break;
            case 'arc':
                this.drawArc(wall);
                break;
            default :
                break;
        }
    }

    drawLine(line: Wall) {
        let start = new L.LatLng(line.start.x, line.start.y);
        let end = new L.LatLng(line.end.x, line.end.y);

        L.polyline(
            [start, end],
            {color: line.color}
        ).addTo(this.map);
    }

    drawArc(arc: Wall) {
        L.curve(
            [
                'M', [arc.start.x, arc.start.y],
                'C', [arc.start.x, arc.start.y], [arc.vertex.x, arc.vertex.y], [arc.end.x, arc.end.y],
                'T', [arc.end.x, arc.end.y]
            ],
            {color: arc.color}
        ).addTo(this.map);
    }
}
