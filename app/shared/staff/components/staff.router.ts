import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import { WorkerSearch } from './workes.search';

import { Toolbar } from '../../app/components/toolbar';


@Component({
    selector: 'staff-route',
    directives: [ROUTER_DIRECTIVES, Toolbar],
    templateUrl: 'staff/templates/staff.router.jade'
})
@RouteConfig([
    { path: '/', as: 'Default', component: WorkerSearch }
])
export class StaffRouter {
    constructor() {}
}
