import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Worker } from '../models/worker';
import { DataService } from '../../app/services/data.service';

@Injectable()
export class WorkerService extends DataService<Worker> {
    constructor(protected http: Http) {
        super(http);
    }

    protected create(data) {
        return new Worker(data);
    }

    protected get PUT_ENDPOINT() {
        return '/api/setworker';
    }

    protected get LOAD_ENDPOINT() {
        return '/api/getworkers';
    }

    protected get REMOVE_ENDPOINT() {
        return '/api/deleteworker';
    }

    search(query: string) {
        query = query.toLowerCase();

        return this.getAll()
            .flatMap<Worker>(array => Observable.from(array, null, null, null))
            .filter(worker => {
                return [worker.firstName, worker.lastName, worker.teamName]
                    .map(string => string.toLowerCase())
                    .some(string => string.indexOf(query) > -1);
            })
            .toArray();
    }
}
