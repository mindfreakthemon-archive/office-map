import { Injectable, EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';
import { Worker } from '../models/worker';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class WorkerService {
    private workers: Worker[] = null;

    public $stream = new EventEmitter<Worker[]>();

    constructor(private http: Http) {}

    load() {
        if (this.workers) {
            this.$stream.next(this.workers);
            return;
        }

        this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .map(workers => this.workers = workers.map(worker => new Worker(worker)))
            .subscribe(workers => this.$stream.next(workers));
    }

    get(id: number): any {
        return this.$stream
            .map(workers => workers.filter(worker => worker.id === id).pop());
    }

    add(worker: Worker) {
        this.workers.push(worker);

        // also http post
    }

    search(query: string) {
        return this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .map(workers => this.workers = workers.map(worker => new Worker(worker)));
    }
}
