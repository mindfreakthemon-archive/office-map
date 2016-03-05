import { Component, ViewChild, ChangeDetectionStrategy } from 'angular2/core';
import { RouteParams } from 'angular2/router';

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

    query = '';
    workersLength = 0;
    roomsLength = 0;

    constructor(public routeParams: RouteParams) {
        this.query = routeParams.get('query');
    }
}
