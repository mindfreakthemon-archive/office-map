import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';


@Component({
    selector: 'worker-search',
    templateUrl: 'staff/templates/worker.search.jade'
})
export class WorkerSearch {
    query: string = 'something';

    constructor(public routeParams: RouteParams) {
        this.query = routeParams.get('query');
    }
}
