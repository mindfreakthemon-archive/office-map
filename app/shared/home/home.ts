import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import { Location } from 'angular2/router';

@Component({
    selector: 'home',
})
@View({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'home/home.jade'
})
export class Home {
    constructor(public location:Location) {}
}
