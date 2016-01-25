import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Worker } from '../models/worker';

@Injectable()
export class WorkerService {
    workers: Worker[];

    constructor(private http: Http) {}

    getWorkers(): Promise<Worker[]> {
        if (this.workers) {
            return Promise.resolve(this.workers.slice(0));
        }

        return this.http.get('/public/mocks/workers.json')
            .map(response => response.json())
            .map(workers => this.workers = workers)
            .toPromise();
    }

    getWorker(id: number): Promise<Worker> {
        let promise = <Promise<Worker|Worker[]>> this.getWorkers();

        return promise
            .then((workers: Worker[]) => {
                let list: Worker[] = workers.filter(worker => worker.id === id);

                if (!list.length) {
                    throw new Error('worker not §ound');
                }

                return list.shift();
            });
    }
}
