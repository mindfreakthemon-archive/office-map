import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminToolbar } from '../../admin/components/admin.toolbar';

@Component({
    directives: [ROUTER_DIRECTIVES, AdminToolbar, Toolbar],
    templateUrl: 'admin/templates/admin.welcome.jade'
})
export class AdminWelcome {

}
