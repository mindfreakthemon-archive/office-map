import { Component } from 'angular2/core';
import { Router, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
    selector: 'quick-search',
    templateUrl: 'app/templates/quick.search.jade'
})
export class QuickSearch {
    public query: string = '';

    constructor(public router: Router) {}

    onSubmit(e) {
        this.router.navigate(['/Search', { query: this.query }]);
    }

    onInput(e) {
        // todo Autocomplete
    }
}
