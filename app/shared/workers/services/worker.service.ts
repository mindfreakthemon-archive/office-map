import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Worker } from '../models/worker';


@Injectable()
export class WorkerService {
    private _cache;
    private workers;

    constructor(private http: Http) {}

    request() {
        if (this._cache) {
            return this._cache;
        }

        return this._cache = this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .flatMap<Worker>(array => Observable.from(array))
            .map(worker => new Worker(worker))
            .delay(1000)
            .share();
    }

    load(): Observable<Worker[]> {
        if (this.workers) {
            return Observable.of(this.workers);
        }

        return this.request()
            .toArray()
            .do(workers => this.workers = workers)
            .share();
    }

    get(id: number) {
        return this.load()
            .flatMap<Worker>(array => Observable.from(array))
            .filter(worker => worker.id === id);
    }

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
