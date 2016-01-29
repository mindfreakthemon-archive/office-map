import { Injectable, EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

import { Floor } from '../models/floor';


@Injectable()
export class FloorService {
    private _cache;
    private floors;

    constructor(private http: Http) {
        this.load();
    }

    request() {
        if (this._cache) {
            return this._cache;
        }

        return this._cache = this.http.get('/public/mocks/floors.json')
            .map(response => response.json())
            .flatMap<Floor>(array => Observable.from(array))
            .map(floor => new Floor(floor))
            .share();
    }

    load() {
        if (this.floors) {
            return Observable.of(this.floors);
        }

        return this.request()
            .toArray()
            .do(floors => this.floors = floors)
            .share();
    }

    purge() {
        this._cache = null;
        this.floors = [];
    }

    getAll() {
        return this.load();
    }

    get(number: number) {
        return this.load()
            .flatMap<Floor>(array => Observable.from(array))
            .filter(floor => floor.number === number);
    }

    index(floor: Floor) {
        return this.floors.findIndex(_floor => _floor.number === floor.number);
    }

    has(floor: Floor) {
        return this.index(floor) > -1;
    }

    put(floor: Floor) {
        if (this.has(floor)) {
            this.floors.splice(this.index(floor), 1, floor);

            // do post
        } else {
            this.floors.push(floor);

            // do put
        }
    }

    remove(floor: Floor) {
        if (this.has(floor)) {
            this.floors.splice(this.index(floor), 1);

            // do delete
        }
    }
}
