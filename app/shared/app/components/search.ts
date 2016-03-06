import { Component } from 'angular2/core';
import { Location, Router, RouteParams } from 'angular2/router';

import { WorkerSearch } from '../../workers/components/worker.search';
import { RoomSearch } from '../../rooms/component/room.search';
import { Toolbar } from './toolbar';
import { Tabs } from '../../tabs/components/tabs';
import { Tab } from '../../tabs/components/tab';


@Component({
    selector: 'quick-search',
    templateUrl: 'app/templates/search.jade',
    directives: [WorkerSearch, RoomSearch, Toolbar, Tabs, Tab]
})
export class Search {

    query: string;
    activeTab: string;

    workersLength = 0;
    roomsLength = 0;

    constructor(
        private routeParams: RouteParams,
        private router: Router,
        private location: Location
    ) {
        this.query = routeParams.get('query');
        this.activeTab = routeParams.get('tab');
    }

    onSelect(tab: Tab) {
        this.activeTab = tab.id;

        this.regenerateURL();
    }

    onBlur() {
        this.regenerateURL();
    }

    regenerateURL() {
        let instruction = this.router.generate(['/SearchTab', { tab: this.activeTab, query: this.query }]);

        this.location.replaceState('/' + instruction.urlPath, instruction.urlParams.join('&'));
    }
}
