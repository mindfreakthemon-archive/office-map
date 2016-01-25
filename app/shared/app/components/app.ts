import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminRouter } from '../../admin/components/admin.router';
import { MapRouter } from '../../map/components/map.router';
import { StaffRouter } from '../../staff/components/staff.router';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/templates/app.jade'
})
@RouteConfig([
    { path: '/', redirectTo: ['/MapRouter', 'Default'] },
    { path: '/admin/...', as: 'AdminRouter', component: AdminRouter, data: { admin: true } },
    { path: '/map/...', as: 'MapRouter', component: MapRouter },
    { path: '/staff/...', as: 'StaffRouter', component: StaffRouter }
])
export class App {}

