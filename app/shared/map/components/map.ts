import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import { Inject, Input } from 'angular2/core';
import * as L from 'leaflet';

import { FloorService } from '../services/floor.service';
import { Floor } from '../models/floor';

@Component({
    selector: 'map-canvas',
    providers: [FloorService]
})
@View({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'map/templates/map.jade'
})
export class Map {
    @Input() floorNumber: number;

    constructor(private floorService: FloorService) {}

    onInit() {
        this.floorService.getFloor(this.floorNumber)
            .then(floor => this.buildMap(floor));
    }

    buildMap(floor: Floor) {
        console.log(floor);

        document.getElementById('mapContainer').innerHTML = '<div id="map" style="width: 600px; height: 400px"></div>';
        let map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
        maxZoom: 18,
        id: 'mapbox.streets'
        }).addTo(map);
    }
}
