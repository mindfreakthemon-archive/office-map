import { Component } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';
import { FloorService } from '../services/floor.service';
import { Floor } from '../models/floor';
import { FloorForm } from './floor.form';

@Component({
    selector: 'floor-add',
    templateUrl: 'floors/templates/floor.add.jade',
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar, FloorForm]
})
export class FloorAdd {
    floor: Floor = new Floor();

    constructor(private router: Router) {}

    onComplete(floor: Floor) {
        this.router.navigate(['/AdminRouter', 'FloorEdit', { floor: this.floor.number }]);
    }
}
