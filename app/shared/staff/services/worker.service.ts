import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Worker } from '../models/worker';


@Injectable()
export class WorkerService {
    constructor(private http: Http) {}

    get(id: number) {}

    put(worker: Worker) {
        // also http put
    }

    search(query: string) {
        return this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .flatMap<Worker>(array => Observable.from(array))
            .map(worker => new Worker(worker))
            .filter(worker => {
                return worker.firstName.indexOf(query) > -1 ||
                    worker.lastName.indexOf(query) > -1 ||
                    worker.teamName.indexOf(query) > -1;
            })
            .delay(1000)
            .toArray();
    }
}
