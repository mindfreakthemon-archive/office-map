import { Component } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { FormBuilder } from 'angular2/common';

import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { Worker, Team } from '../models/worker';
import { WorkerService } from '../services/worker.service';
import { WorkerItem } from './worker.item';
import { FilterPipe } from '../../app/pipe/filter.pipe';
import { SearchPipe } from '../../app/pipe/search.pipe';


@Component({
    selector: 'worker-search',
    templateUrl: 'workers/templates/worker.search.jade',
    directives: [ROUTER_DIRECTIVES, PaginationControlsCmp, WorkerItem],
    pipes: [PaginatePipe, FilterPipe, SearchPipe],
    providers: [PaginationService]
})
export class WorkerSearch {
    workers: Worker[];

    query: string = '';
    teamFilter = new Set();

    ITEMS_PER_PAGE = 10;
    TEAM_MAP = Array.from(<any> Worker.TEAM_NAMES_MAP);

    constructor(public routeParams: RouteParams,
                public workerService: WorkerService) {

        this.query = routeParams.get('query');
        this.request();
    }

    request() {
        let query = this.query.toLowerCase();

        this.workerService.getEach()
            .filter(worker => {
                return query ?
                    ['firstName', 'lastName', 'teamName']
                        .map(key => worker[key])
                        .map(string => string.toLowerCase())
                        .some(string => string.indexOf(query) > -1) :
                    true;
            })
            .filter(worker => {
                if (this.teamFilter.size) {
                    return this.teamFilter.has(worker.team);
                }

                return true;
            })
            .toArray()
            .subscribe(workers => this.workers = workers);
    }

    setFilter(team: Team, show: boolean) {
        if (show) {
            this.teamFilter.add(team);
        } else {
            this.teamFilter.delete(team);
        }

        this.request();
    }

    setQuery(query: string) {
        this.query = query;

        this.request();
    }
}
