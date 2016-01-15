import { Component } from 'angular2/angular2';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

@Component({
    selector: 'toolbar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/templates/toolbar.jade'
})
export class Toolbar {
    constructor(public router: Router) {}
}

