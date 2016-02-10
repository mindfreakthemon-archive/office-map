import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import * as L from 'leaflet';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';
import { Worker } from '../../workers/models/worker';
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

        let onMapClick = (e) => {
            switch(this.clickAction) {
                case 0:
                    break;
                case 1:
                    let point = { "x": e.latlng.lat, "y": e.latlng.lng }
                    this.floor.addSeat(point);
                    this.drawSeat(point);
                    break;
                case 3:
                    alert("You clicked the map at 3" + e.latlng);
                    break;
            }
        };

        this.map.on('click', onMapClick);

        L.tileLayer('http://i.imgur.com/yg93iDJ.png', { maxZoom: 12, id: 'random' })
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
        let generator = new arc.GreatCircle(wall.start, wall.end);
        let line = generator.Arc(100, { offset: 300 });
        console.log(line);

        L.geoJson(line.json()).addTo(this.map);
    }

    drawLine(wall, map) {
        let start = new L.LatLng(wall.start.x, wall.start.y);
        let end = new L.LatLng(wall.end.x, wall.end.y);
        L.polyline([start, end], {color: 'red'}).addTo(map);
    }
}
