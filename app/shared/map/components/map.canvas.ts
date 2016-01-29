import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import * as L from 'leaflet';

import { AdminActionService, AdminAction } from '../../admin/services/admin.action.service';
import { FloorService } from '../services/floor.service';
import { Floor } from '../models/floor';


@Component({
    selector: 'map-canvas',
    templateUrl: 'map/templates/map.jade'
})
export class MapCanvas {
    @Input() floorNumber: number = 20;
    workerId: number;

    clickAction: AdminAction = AdminAction.NONE;
    adminActionSubscription: any;

    private map: any;

    constructor(private floorService: FloorService,
                private adminActionService: AdminActionService,
                private routeParams: RouteParams) {
        if (routeParams.get('worker')) {
            this.workerId = +routeParams.get('worker');
        } else if (routeParams.get('floor')) {
            this.floorNumber = +routeParams.get('floor');
        }
    }

    ngOnInit() {
        this.initMap();

        if (this.workerId) {
            // should locate the worker
        }

        this.floorService.get(this.floorNumber)
            .subscribe(floor => this.buildMap(floor));

        this.adminActionSubscription = this.adminActionService.getEmitter()
            .subscribe(action => {
                this.clickAction = action;
            });
    }

    ngOnDestroy() {
        this.adminActionSubscription.unsubscribe();
    }

    initMap() {
        document.getElementById('mapContainer').innerHTML = '<div id="map"></div>';

        this.map = L.map('map', { zoomControl: false })
            .setView([39.5, -8.5], 7);

        new L.Control.Zoom({ position: 'bottomleft' }).addTo(this.map);

        //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
        //    maxZoom: 18,
        //    id: 'mapbox.streets'
        //}).addTo(map);
    }

    buildMap(floor: Floor) {
        if (floor.seats) {
            const canvasTiles = L.tileLayer.canvas();

            canvasTiles.drawTile = this.drowSeats(canvasTiles, floor['seats'], this.map);
            this.map.addLayer(canvasTiles);
        }
    }

    drowSeats(canvasTiles, points, map) {
        return (canvas, tile, zoom) => {
            let context = canvas.getContext('2d'),
                radius = 12,
                tileSize = canvasTiles.options.tileSize;

            for (let i = 0; i < points.length; i++) {
                let point = new L.LatLng(points[i].lat, points[i].lon),
                    start = tile.multiplyBy(tileSize),
                    p = map.project(point),
                    x = Math.round(p.x - start.x),
                    y = Math.round(p.y - start.y),
                    grd = context.createRadialGradient(x, y, 5, x, y, radius);

                // Circle
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI, false);

                // Fill (Gradient)
                grd.addColorStop(0, "#8ED6FF");
                grd.addColorStop(1, "#004CB3");
                context.fillStyle = grd;
                context.fill();
            }

            return canvasTiles;
        };
    }
}
