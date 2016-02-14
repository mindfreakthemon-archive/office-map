import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { WorkerSearch } from '../../workers/components/worker.search';
import { Toolbar } from './toolbar';


@Component({
    selector: 'quick-search',
    templateUrl: 'app/templates/search.jade',
    directives: [WorkerSearch, Toolbar]
})
export class Search {

    query: string = '';

    constructor(public routeParams: RouteParams) {
        this.query = routeParams.get('query');
    }
}