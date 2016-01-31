import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Worker } from '../models/worker';
import { DataService } from '../../app/services/DataService';


@Injectable()
export class WorkerService extends DataService<Worker> {
    constructor(protected http: Http) {
        super();
    }

    request() {
        return this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .flatMap<Worker>(array => Observable.from(array))
            .map(worker => new Worker(worker))
            .delay(1000)
            .share();
    }

    search(query: string) {
        query = query.toLowerCase();

        return this.getAll()
            .flatMap<Worker>(array => Observable.from(array))
            .filter(worker => {
                return [worker.firstName, worker.lastName, worker.teamName]
                    .map(string => string.toLowerCase())
                    .some(string => string.indexOf(query) > -1);
            })
            .delay(1000)
            .toArray();
    }
}
