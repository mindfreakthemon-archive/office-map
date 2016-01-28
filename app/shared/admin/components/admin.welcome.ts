import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Toolbar } from '../../app/components/toolbar';
import { AdminTools } from '../../admin/components/admin.tools';

@Component({
    directives: [ROUTER_DIRECTIVES, AdminTools, Toolbar],
    templateUrl: 'admin/templates/admin.welcome.jade'
})
export class AdminWelcome {

}
