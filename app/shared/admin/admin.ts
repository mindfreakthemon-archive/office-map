import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import { Location } from 'angular2/router';

@Component({
    selector: 'admin',
})
@View({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'admin/admin.jade'
})
export class Admin {
    constructor(public location:Location) {}
}
