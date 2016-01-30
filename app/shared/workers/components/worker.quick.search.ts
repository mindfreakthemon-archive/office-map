import { Component } from 'angular2/core';
import { Router, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
    selector: 'worker-quick-search',
    templateUrl: 'workers/templates/worker.quick.search.jade'
})
export class WorkerQuickSearch {
    public query: string = '';

    constructor(public router: Router) {}

    onSubmit(e) {
        this.router.navigate(['/WorkerRouter', 'Default', { query: this.query }]);
    }

    onInput(e) {
        // todo Autocomplete
    }
}
