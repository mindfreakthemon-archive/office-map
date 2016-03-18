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

    private allMapLayers;

    private map;

    constructor(
        private adminActionService: AdminActionService,
        private workerService: WorkerService,
        private floorService: FloorService,
        private roomService: RoomService
    ) {}

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
                'http://www.southworth.com/shop/swatches/popup_white.jpg',
                //'public/images/{z}/{x}/{y}.png',
                {
                    maxZoom: 12,
                    id: 'random'
                }
            );

        this.map = L.map('map', { zoomControl: false });
        this.map.setView([68.23682270936281, -40.25390625000001], 3);

        var southWest = L.latLng(85.49962660119635, 149.06250000000003),
            northEast = L.latLng(24.367113562651276, -209.53125),
            bounds = L.latLngBounds(southWest, northEast);

        this.map.setMaxBounds(bounds);
        this.map.setMinZoom(3);
        this.map.setMaxZoom(5);

        controlZoom.addTo(this.map);
        tileLayer.addTo(this.map);

        this.attachMapEvents();
    }

    buildMap(floor: Floor) {
        this.allMapLayers = new L.layerGroup();
        floor.seats.map((seat) => this.drawSeat(seat));
        floor.walls.map(wall => this.drawWall(wall));
        floor.places.map(place => this.drawPlace(place));
        this.allMapLayers.addTo(this.map);
        window['gorup'] =this.allMapLayers;
        this.worker && this.locateWorker();
        this.room && this.locateRoom();
    }

    attachMapEvents() {
        let linePoints = [],
            arcPoints = [];

        let drawTemporaryLine,
            drawTemporaryArc;

        let temporaryFirstPoint,
            temporarySecondPoint;

        let temporaryFirstLine,
            temporarySecondLine;

        let temporaryArc;

        let createLine,
            createArc;

        createLine = createLine ? createLine : (e) => {
            let point = {x: e.latlng.lat, y: e.latlng.lng};

            linePoints.push(point);

            drawTemporaryLine = drawTemporaryLine ? drawTemporaryLine : (e) => {
                temporaryFirstLine && this.allMapLayers.removeLayer(temporaryFirstLine);

                let start = new L.LatLng(linePoints[0].x, linePoints[0].y),
                    end = new L.LatLng(e.latlng.lat,  e.latlng.lng);

                temporaryFirstLine = L.polyline([start, end]);
                this.allMapLayers.addLayer(temporaryFirstLine);
            };

            if(linePoints.length === 1) {
                temporaryFirstPoint = L.circleMarker([linePoints[0].x, linePoints[0].y])
                    .setRadius(3);
                this.allMapLayers.addLayer(temporaryFirstPoint);
                this.map.on('mousemove', drawTemporaryLine);
            } else {
                this.allMapLayers.removeLayer(temporaryFirstPoint);
                this.allMapLayers.removeLayer(temporaryFirstLine);

                this.map.off('mousemove', drawTemporaryLine);
                this.floor.addWall('line', 'black', linePoints[0], linePoints[1]);
                linePoints = [];
                this.floorService
                    .put(this.floor)
                    .subscribe(() => this.drawWall(this.floor.lastWall()));
            }
        };

        createArc = createArc ? createArc : (e) => {
            let point = {x: e.latlng.lat, y: e.latlng.lng};

            arcPoints.push(point);

            drawTemporaryArc = drawTemporaryArc ? drawTemporaryArc : (e) => {
                if(temporaryArc) {
                    this.allMapLayers.removeLayer(temporaryFirstLine);
                    this.allMapLayers.removeLayer(temporarySecondLine);
                    this.allMapLayers.removeLayer(temporaryArc);
                }

                temporaryFirstLine = L.polyline([
                    new L.LatLng(arcPoints[0].x, arcPoints[0].y),
                    new L.LatLng(e.latlng.lat, e.latlng.lng)
                ]);

                this.allMapLayers.addLayer(temporaryFirstLine);

                temporarySecondLine = L.polyline([
                    new L.LatLng(arcPoints[1].x, arcPoints[1].y),
                    new L.LatLng(e.latlng.lat, e.latlng.lng)
                ]);

                this.allMapLayers.addLayer(temporarySecondLine);

                temporaryArc = L.curve(
                    [
                        'M', [arcPoints[0].x, arcPoints[0].y],
                        'C', [arcPoints[0].x, arcPoints[0].y], [e.latlng.lat, e.latlng.lng], [arcPoints[1].x, arcPoints[1].y],
                        'T', [arcPoints[1].x, arcPoints[1].y]
                    ]
                );

                this.allMapLayers.addLayer(temporaryArc);
            };

            if (arcPoints.length === 1) {
                temporaryFirstPoint = L.circleMarker([arcPoints[0].x, arcPoints[0].y])
                    .setRadius(3);

                this.allMapLayers.addLayer(temporaryFirstPoint);
            } else if (arcPoints.length === 2) {
                temporarySecondPoint = L.circleMarker([arcPoints[1].x, arcPoints[1].y])
                    .setRadius(3);

                this.allMapLayers.addLayer(temporarySecondPoint);
                this.map.on('mousemove', drawTemporaryArc);
            } else {
                this.allMapLayers.removeLayer(temporaryFirstLine);
                this.allMapLayers.removeLayer(temporarySecondLine);
                this.allMapLayers.removeLayer(temporaryArc);
                this.allMapLayers.removeLayer(temporaryFirstPoint);
                this.allMapLayers.removeLayer(temporarySecondPoint);

                this.map.off('mousemove', drawTemporaryArc);
                this.floor.addWall('arc', 'black', arcPoints[0], arcPoints[1], arcPoints[2]);
                arcPoints = [];
                this.floorService
                    .put(this.floor)
                    .subscribe(() => this.drawWall(this.floor.lastWall()));
            }
        };

        let attachSeat = (e) => {
            this.floor.addSeat(e.latlng);
            this.floorService.put(this.floor)
                .subscribe(() => this.drawSeat(this.floor.lastSeat()));
        };

        let attachPlace = (e) => {
            this.roomService.get(this.roomIdToAttach).subscribe(room => {
                room['floor'] = this.floor.number;
                this.floor.addPlace(e.latlng, room);
                this.floorService.put(this.floor)
                    .subscribe(() => this.drawPlace(this.floor.lastPlace()));
            });
        };

        let onMapClick = (e) => {
            (this.clickAction === 1) && attachSeat(e);
            (this.clickAction === 3) && attachPlace(e);
            (this.clickAction === 4) && createLine(e);
            (this.clickAction === 5) && createArc(e);
        };

        this.map.on('click', onMapClick);
    }

    locateWorker() {
        let workerSeat = this.floor.seats.filter(seat => seat.worker === this.worker.id)[0],
            newCenter = new L.LatLng(workerSeat.position.x, workerSeat.position.y);

        this.map.setView(newCenter, 9);

        this.openPopupforLocated(workerSeat.position);
    }

    locateRoom() {
        let room = this.floor.places.filter(place => place.id === this.room.id)[0],
            newCenter = new L.LatLng(room.position.x, room.position.y);

        this.map.setView(newCenter, 5);

        this.openPopupforLocated(room.position);
    }

    openPopupforLocated(layerPosition) {
        for(let id in this.allMapLayers._layers) {
            if (this.allMapLayers._layers[id]._latlng && (this.allMapLayers._layers[id]._latlng.lat === layerPosition.x) && (this.allMapLayers._layers[id]._latlng.lng === layerPosition.y)) {
                this.allMapLayers._layers[id].openPopup();
            }
        }
    }

    drawPlace(place: Place) {
        let myIcon = L.icon({
            iconUrl: place.icon,
            iconAnchor: [12, 12],
            popupAnchor: [3, -5]
        });

        let placeOnMap = L.marker([place.position.x, place.position.y], {icon: myIcon})
            .bindPopup(`room: ${place.name}`);

        this.allMapLayers.addLayer(placeOnMap);

        let deletePlace = () => {
            this.floor.deletePlace(place);
            this.floorService
                .put(this.floor)
                .subscribe(() => {
                    this.allMapLayers.removeLayer(placeOnMap);
                });
        };

        placeOnMap.on('click', (e) => {
            (this.clickAction === 6) && deletePlace();
        });
    }

    drawSeat(seat: Seat) {
        let latlng = new L.LatLng(seat.position.x, seat.position.y),
            seatOnMap = L.circleMarker(latlng);

        this.allMapLayers.addLayer(seatOnMap);

        let deleteSeat = () => {
            this.floor.deleteSeat(seat);
            this.floorService
                .put(this.floor)
                .subscribe(() => {
                    this.allMapLayers.removeLayer(seatOnMap);
                });
        };

        seatOnMap.on('click', (e) => {
            (this.clickAction === 6) && deleteSeat();
        });

        if (seat.worker) {
            this.workerService.get(seat.worker).subscribe(worker => {
                seatOnMap
                    .setStyle({color: 'red'})
                    .bindPopup(`<img src="${worker.photo}" alt=""/>
                         <br>worker: ${worker['firstName']}
                         <br>lastName: ${worker['lastName']}`);
            });
        } else seatOnMap.on('click', (e) => {
            if (this.clickAction === 2) {
                this.floor.setWorkerOnSeat(seat, this.workerIdToAttach);
                this.floorService
                    .put(this.floor)
                    .subscribe(() => {
                        this.allMapLayers.removeLayer(seatOnMap);
                        this.drawSeat(seat);
                    });
            }
        });
    }

    drawWall(wall: Wall) {
        (wall.type === 'line') && this.drawLine(wall);
        (wall.type === 'arc') && this.drawArc(wall);
    }

    drawLine(line: Wall) {
        let start = new L.LatLng(line.start.x, line.start.y),
            end = new L.LatLng(line.end.x, line.end.y);

        let lineOnmap = L.polyline(
            [start, end],
            {color: line.color}
        );

        this.allMapLayers.addLayer(lineOnmap);

        let deleteLine = () => {
            this.floor.deleteWall(line);
            this.floorService
                .put(this.floor)
                .subscribe(() => this.allMapLayers.removeLayer(lineOnmap));
        };

        lineOnmap.on('click', (e) => {
            (this.clickAction === 6) && deleteLine();
        });
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

        this.allMapLayers.addLayer(arcOnMap);

        let deleteArc = () => {
            this.floor.deleteWall(arc);
            this.floorService
                .put(this.floor)
                .subscribe(() => this.allMapLayers.removeLayer(arcOnMap));
        };

        arcOnMap.on('click', (e) => {
            (this.clickAction === 6) && deleteArc();
        });
    }
}
