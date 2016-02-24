import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import * as L from 'leaflet';
import 'leaflet-curve';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';
import { FloorService } from '../../floors/services/floor.service';
import { Floor } from '../../floors/models/floor';
import { Worker } from '../../workers/models/worker';
import { Room } from '../../rooms/models/room';
import { Wall } from '../models/wall';
import { Seat } from '../models/seat';
import { Point } from '../models/point';
import { Place } from '../models/place';
import { WorkerService } from '../../workers/services/worker.service';
import { RoomService } from '../../rooms/services/room.service';

@Component({
    selector: 'map-canvas',
    templateUrl: 'map/templates/map.jade'
})
export class MapCanvas {
    @Input() floor: Floor;
    @Input() worker: Worker;
    //@Input() workerId: string;
    @Input() room: Room;

    adminActionSubscription: any;
    adminWorkerSubscription: any;
    adminRoomSubscription: any;

    getWorkersSubscription: any;
    getRoomsSubscription: any;

    workers: Worker[];
    rooms: Room[];

    workerIdToAttach: string;
    roomIdToAttach: string;
    clickAction: AdminAction = AdminAction.NONE;

    private map;

    constructor(private adminActionService: AdminActionService, private workerService: WorkerService, private roomService: RoomService) {}

    ngOnInit() {
        this.initMap();
        this.buildMap(this.floor);

        this.adminActionSubscription = this.adminActionService.getEmitter()
            .subscribe(action => this.clickAction = action);

        this.adminWorkerSubscription = this.adminActionService.getWorkerEmitter()
            .subscribe(workerId => this.workerIdToAttach = workerId);

        this.adminRoomSubscription = this.adminActionService.getRoomEmitter()
            .subscribe(roomId => this.roomIdToAttach = roomId);

        this.getWorkersSubscription = this.workerService.getAll()
            .subscribe(workers => this.workers = workers);

        this.getRoomsSubscription = this.roomService.getAll()
            .subscribe(rooms => this.rooms = rooms);

        if (this.worker) {
            this.locateWorker();
        }

        if (this.room) {
            this.locateRoom();
        }
    }

    ngOnDestroy() {
        this.adminActionSubscription.unsubscribe();
        this.adminWorkerSubscription.unsubscribe();
        this.adminRoomSubscription.unsubscribe();

        this.getWorkersSubscription.unsubscribe();
        this.getRoomsSubscription.unsubscribe();
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

        this.attachMapEvents();
    }

    buildMap(floor: Floor) {
        floor.seats.map((seat) => {
            this.drawSeat(seat);
        });

        floor.walls.map(wall => {
            this.drawWall(wall);
        });

        floor.places.map(place => {
            this.drawPlace(place);
        });
    }

    attachMapEvents() {
        let linePoints = [],
            arcPoints = [],
            drawTemporaryLine,
            drawTemporaryArc,
            pointOnMap;

        let createLine = (e) => {
            let point = {x: e.latlng.lat, y: e.latlng.lng};
            let temporaryLine: any;

            linePoints.push(point);
            pointOnMap = L.circleMarker([e.latlng.lat, e.latlng.lng]);

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
            let temporaryFirstLine: any;
            let temporarySecondLine: any;
            let temporaryArc: any;

            arcPoints.push(point);
            pointOnMap = L.circleMarker([e.latlng.lat, e.latlng.lng]);

            drawTemporaryArc = (drawTemporaryArc) ? drawTemporaryArc : (e) => {
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

        let attachSeat = (e) => {
            this.floor.addSeat(e.latlng);
            this.drawSeat(this.floor.lastSeat());
        };

        let attachPlace = (e) => {
            this.roomService.searchById(this.roomIdToAttach).subscribe(room => {
                room['floor'] = this.floor.number;
                this.floor.addPlace(e.latlng, room, 'meeting.png');
                this.drawPlace(this.floor.lastPlace());
            });
        };

        let onMapClick = (e) => {
            switch(this.clickAction) {
                case 1:
                    attachSeat(e);
                    break;
                case 3:
                    attachPlace(e);
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

    locateWorker() {
        let workerSeat = this.floor.seats.filter(seat => seat.worker === this.worker.id)[0],
            newCenter = new L.LatLng(workerSeat.position.x, workerSeat.position.y);

        this.map.setView(newCenter , 10);
    }

    locateRoom() {
        let room = this.floor.places.filter(place => place.id === this.room.id)[0],
            newCenter = new L.LatLng(room.position.x, room.position.y);

        this.map.setView(newCenter , 10);
    }

    drawPlace(place) {
        let myIcon = L.icon({iconUrl: 'public/images/' + place.icon});

        L.marker([place.position.x, place.position.y], {icon: myIcon})
            .bindPopup(`room: ${place.name}`)
            .addTo(this.map);
    }

    drawSeat(seat: Seat) {
        let latlng = new L.LatLng(seat.position.x, seat.position.y),
            seatOnMap = L.circleMarker(latlng);

        if (seat.worker) {
            this.workerService.searchById(seat.worker).subscribe(worker => {
                seatOnMap
                    .setStyle({color: 'red'})
                    .bindPopup(`<img src="${worker.photo}" alt=""/>
                         <br>worker: ${worker['firstName']}
                         <br>lastName: ${worker['lastName']}`);
            });
        } else seatOnMap.on('click', (e) => {
            if (this.clickAction === 2) {
                this.floor.setWorkerOnSeat(seat, this.workerIdToAttach);
                this.map.removeLayer(seatOnMap);
                this.drawSeat(seat);
            }
        });

        seatOnMap.addTo(this.map);
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
            end = new L.LatLng(line.end.x, line.end.y);

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
