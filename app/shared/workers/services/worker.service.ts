import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Worker } from '../models/worker';
import { DataService } from '../../app/services/data.service';

@Injectable()
export class WorkerService extends DataService<Worker> {
    constructor(protected http: Http) {
        super();
    }

    setWorker(worker: Worker) {
        let headers = new Headers(),
            body =  JSON.stringify(worker);

        headers.append('Content-Type', 'application/json');

        this.http.post('/setworker', body, {headers: headers})
            .subscribe();
    }

    request() {
        this.http.get('/getworkers')
            .subscribe((workers) => console.log('workers', JSON.parse(workers._body)));

        return this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .flatMap<Worker>(array => Observable.from(array, null, null, null))
            .map(worker => {
                //this.setWorker(worker);
                new Worker(worker);
            })
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
}
