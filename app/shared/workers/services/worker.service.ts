import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Worker } from '../models/worker';
import { DataService } from '../../app/services/data.service';


@Injectable()
export class WorkerService extends DataService<Worker> {
    constructor(protected http: Http) {
        super();
    }

    request() {
        return this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .flatMap<Worker>(array => Observable.from(array, null, null, null))
            .map(worker => new Worker(worker))
            .share();
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

    searchById(id: string) {
        return this.getAll()
            .flatMap<Worker>(array => Observable.from(array, null, null, null))
            .filter(worker => {
                return worker.id === id;
            });
    }
}
