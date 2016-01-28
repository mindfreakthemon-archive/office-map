import { Component } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { AdminActionService, AdminAction } from '../services/admin.action.service';


@Component({
    selector: 'admin-tools',
    templateUrl: 'admin/templates/admin.toolbar.jade',
    directives: [ROUTER_DIRECTIVES]
})
export class AdminToolbar {
}
