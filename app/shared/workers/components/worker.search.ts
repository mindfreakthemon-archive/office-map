import { Component, Input, OnChanges, SimpleChange } from 'angular2/core';
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

    ngOnInit() {
        this.request();
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes.query) {
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
