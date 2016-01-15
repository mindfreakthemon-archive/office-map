import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import { Location } from 'angular2/router';
import 'leaflet';

@Component({
    selector: 'map',
})
@View({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'map/map.jade'
})
export class Map {
    name: string = 'map'
    constructor(public location:Location) {
        mapBuilder.build();
    }
}

let  mapBuilder =  {
    build() {
        document.getElementById('mapContainer').innerHTML = '<div id="map" style="width: 600px; height: 400px"></div>';
        let map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(map);
    }
}