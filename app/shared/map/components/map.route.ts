import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteParams } from 'angular2/router';
import { Inject } from 'angular2/core';

import { Map } from './map';

const DEFAULT_FLOOR = 20;

@Component({
    selector: 'map-route'
})
@View({
    directives: [CORE_DIRECTIVES, Map],
    template: '<map-canvas [floor-number]="floorNumber"></map-canvas>'
})
export class MapRoute {
    private floorNumber: number;

    constructor(private routeParams: RouteParams) {
        this.floorNumber = +routeParams.get('number') || DEFAULT_FLOOR;
    }

}
