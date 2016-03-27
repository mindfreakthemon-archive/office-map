import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { FloorService } from '../services/floor.service';
import { Floor } from '../models/floor';
import { FloorItem } from './floor.item';


@Component({
    selector: 'floors-list',
    templateUrl: '/floors/templates/floor.list.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, FloorItem]
})
export class FloorList {
    floors: Floor[];

    constructor(public floorService: FloorService) {
        this.floorService.getAll()
            .subscribe(floors => this.floors = floors);
    }
}
