import { Component } from 'angular2/core';
import { Router, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
    selector: 'quick-search',
    templateUrl: 'app/templates/quick.search.jade'
})
export class QuickSearch {
    query = '';

    constructor(public router: Router) {}

    onSubmit(event) {
        this.router.navigate(['/SearchTab', { tab: 'workers', query: this.query }]);
    }

    onInput(e) {
        // todo Autocomplete
    }
}
