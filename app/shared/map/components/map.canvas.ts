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
import { Room } from '../models/room';
import { WorkerService } from '../../workers/services/worker.service';
import { RoomService } from '../../rooms/services/room.service';

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
    getRoomsSubscriptions: any;

    workers: Worker[];
    rooms: Room[];

    private map;

    constructor(private adminActionService: AdminActionService, public workerService: WorkerService, public roomService: RoomService) {}

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

        this.getRoomsSubscriptions = this.roomService.getAll()
            .subscribe(rooms => {
                rooms.map(room => {
                    if(this.floor.number == room.floor){
                        this.drawRoom(room);
                    }
                });
            });
    }

    ngOnDestroy() {
        this.adminActionSubscription.unsubscribe();
        this.getWorkersSubscription.unsubscribe();
        this.getRoomsSubscriptions.unsubscribe();
    }

    initMap() {
        let controlZoom = new L.Control.Zoom({ position: 'bottomleft' }),
            tileLayer = L.tileLayer(
                'http://www.colorcombos.com/images/colors/FFFFFF.png',
                {
                    maxZoom: 12,
                    id: 'random'
                }
            );

        this.map = L.map('map', { zoomControl: false });
        this.map.setView([39.5, -8.5], 7);

        controlZoom.addTo(this.map);
        tileLayer.addTo(this.map);

        let linePoints = [],
            arcPoints = [],
            group = L.layerGroup().addTo(this.map),
            drawTemporaryLine,
            drawTemporaryArc,
            pointOnMap;

        let createLine = (e) => {
            let point = {x: e.latlng.lat, y: e.latlng.lng};
            let temporaryLine: L.polyline;

            linePoints.push(point);
            pointOnMap = L.circle([e.latlng.lat, e.latlng.lng]);

            if (!drawTemporaryLine){
                drawTemporaryLine =  (e) => {
                    if(temporaryLine) {
                        this.map.removeLayer(temporaryLine);
                    }

                    let start = new L.LatLng(linePoints[0].x, linePoints[0].y),
                        end = new L.LatLng(e.latlng.lat, e.latlng.lng);

                    temporaryLine = L.polyline([start, end]).addTo(this.map);
                };
            }

            if(linePoints.length === 1) {
                pointOnMap.addTo(this.map);
                this.map.on('mousemove', drawTemporaryLine);
            } else {
                this.map.off('mousemove', drawTemporaryLine);
                this.floor.addWall('line', 'black', linePoints[0], linePoints[1]);
                linePoints = [];
                this.drawWall(this.floor.lastWall());
            }
        };

        let createArc = (e) => {
            let point = {x: e.latlng.lat, y: e.latlng.lng};
            let temporaryFirstLine: L.polyline;
            let temporarySecondLine: L.polyline;
            let temporaryArc: L.curve;

            arcPoints.push(point);
            pointOnMap = L.circle([e.latlng.lat, e.latlng.lng]);

            if (!drawTemporaryArc){
                drawTemporaryArc = (e) => {
                    if(temporaryArc) {
                        this.map.removeLayer(temporaryFirstLine);
                        this.map.removeLayer(temporarySecondLine);
                        this.map.removeLayer(temporaryArc);
                    }

                    temporaryFirstLine = L.polyline([
                        new L.LatLng(arcPoints[0].x, arcPoints[0].y),
                        new L.LatLng(e.latlng.lat, e.latlng.lng)
                    ]).addTo(this.map);

                    temporarySecondLine = L.polyline([
                        new L.LatLng(arcPoints[1].x, arcPoints[1].y),
                        new L.LatLng(e.latlng.lat, e.latlng.lng)
                    ]).addTo(this.map);

                    temporaryArc = L.curve(
                        [
                            'M', [arcPoints[0].x, arcPoints[0].y],
                            'C', [arcPoints[0].x, arcPoints[0].y], [e.latlng.lat, e.latlng.lng], [arcPoints[1].x, arcPoints[1].y],
                            'T', [arcPoints[1].x, arcPoints[1].y]
                        ]
                    ).addTo(this.map);
                };
            }

            if(arcPoints.length === 1) {
                pointOnMap.addTo(this.map);
            } else if (arcPoints.length === 2) {
                pointOnMap.addTo(this.map);
                this.map.on('mousemove', drawTemporaryArc);
            } else {
                this.map.off('mousemove', drawTemporaryArc);
                this.floor.addWall('arc', 'black', arcPoints[0], arcPoints[1], arcPoints[2]);
                arcPoints = [];
                this.drawWall(this.floor.lastWall());
            }
        };

        let onMapClick = (e) => {
            switch(this.clickAction) {
                case 1:
                    this.floor.addSeat(e.latlng);
                    this.drawSeat(this.floor.lastSeat());
                    break;
                case 3:
                    alert("You clicked the map at 3" + e.latlng);
                    break;
                case 4:
                    createLine(e);
                    break;
                case 5:
                    createArc(e);
                    break;
                default:
                    break;
            }
        };

        this.map.on('click', onMapClick);
    }

    buildMap(floor: Floor) {
        this.floor.seats.map((seat) => {
            this.drawSeat(seat);
        });

        floor.walls.map(wall => {
            this.drawWall(wall);
        });
    }

    drawRoom(room: Room) {
        let latlng = new L.LatLng(room.position.x, room.position.y),
            roomOnMap = L.circleMarker(latlng, {color: 'green'});

        roomOnMap.addTo(this.map);
        roomOnMap.bindPopup(`room: ${room.name}`);
    }

    drawSeat(seat: Seat) {
        let latlng = new L.LatLng(seat.position.x, seat.position.y),
        seatOnMap = L.circleMarker(latlng),
        onSeatClick = (e) => {
            if (this.clickAction === 2){
                this.floor.setWorkerOnSeat(seat, this.workers[0]);
                this.map.removeLayer(seatOnMap);
                this.drawSeat(seat);
            }
        };

        seatOnMap.addTo(this.map);

        if (seat.worker){
            seatOnMap.setStyle({color: 'red'});
            seatOnMap.bindPopup(`<img src="${seat.worker.photo}" alt=""/> <br> worker: ${seat.worker['firstName']}<br>lastName: ${seat.worker['lastName']}`);
        } else {
            seatOnMap.on('click', onSeatClick);
        }
    }



    drawWall(wall: Wall) {
        switch(wall.type) {
            case 'line':
                this.drawLine(wall);
                break;
            case 'arc':
                this.drawArc(wall);
                break;
        }
    }

    drawLine(line: Wall) {
        let start = new L.LatLng(line.start.x, line.start.y),
            end = new L.LatLng(line.end.x, line.end.y),
            lineOnMap = L.polyline(
                [start, end],
                {color: line.color}
            );

        lineOnMap.addTo(this.map);
    }

    drawArc(arc: Wall) {
        let arcOnMap = L.curve(
            [
                'M', [arc.start.x, arc.start.y],
                'C', [arc.start.x, arc.start.y], [arc.vertex.x, arc.vertex.y], [arc.end.x, arc.end.y],
                'T', [arc.end.x, arc.end.y]
            ],
            {color: arc.color}
        );

        arcOnMap.addTo(this.map);
    }
}
