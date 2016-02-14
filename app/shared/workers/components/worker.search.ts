import { Component, Input, OnChanges, SimpleChange } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { Worker, Team } from '../models/worker';
import { WorkerService } from '../services/worker.service';
import { WorkerItem } from './worker.item';
import { FilterUtils } from '../../app/utils/filter.utils';


@Component({
    selector: 'worker-search',
    templateUrl: 'workers/templates/worker.search.jade',
    directives: [ROUTER_DIRECTIVES, PaginationControlsCmp, WorkerItem],
    pipes: [PaginatePipe],
    providers: [PaginationService]
})
export class WorkerSearch implements OnChanges {
    workers: Worker[];

    @Input() query: string = '';
    @Input() itemsPerPage = 10;
    @Input() showQueryField: boolean = false;

    teamFilter = new Set();
    genderFilter = new Set();

    genderMap = Array.from(<any> Worker.GENDER_MAP);
    teamMap = Array.from(<any> Worker.TEAM_NAMES_MAP);

    constructor(public workerService: WorkerService) {}

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['query']) {
            this.request();
        }
    }

    setTeamFilter(team: Team, show: boolean) {
        if (show) {
            this.teamFilter.add(team);
        } else {
            this.teamFilter.delete(team);
        }

        // also makes request on every change
        this.request();
    }

    setGenderFilter(gender: number, show: boolean) {
        if (show) {
            this.genderFilter.add(gender);
        } else {
            this.genderFilter.delete(gender);
        }

        // also makes request on every change
        this.request();
    }

    request() {
        this.workers = null;

        this.workerService.getEach()
            .filter(FilterUtils.searchFilter(this.query, ['firstName', 'lastName']))
            .filter(worker => {
                if (this.teamFilter.size) {
                    return this.teamFilter.has(worker.team);
                }

                return true;
            })
            .filter(worker => {
                if (this.genderFilter.size) {
                    return this.genderFilter.has(worker.gender);
                }

                return true;
            })
            .toArray()
            .subscribe(workers => this.workers = workers);
    }
}
