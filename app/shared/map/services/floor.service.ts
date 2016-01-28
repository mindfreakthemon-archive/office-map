import { Injectable, EventEmitter } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Floor } from '../models/floor';


@Injectable()
export class FloorService {
    private floors: Floor[] = null;

    public $stream = new EventEmitter<Floor[]>();

    constructor(private http: Http) {}

    load() {
        if (this.floors) {
            this.$stream.next(this.floors);
            return;
        }

        this.http.get('/public/mocks/floors.json')
            .map(response => response.json())
            .map(floors => this.floors = floors.map(floor => new Floor(floor)))
            .subscribe(floors => this.$stream.next(floors))
    }

    get(number: number): any {
        return this.$stream
            .map(floors => floors.filter(floor => floor.number === number).pop());
    }

    add(floor: Floor) {
        this.floors.push(floor);

        // also http post
    }

    remove(floor: Floor) {
        let index = this.floors.indexOf(floor);

        this.removeByIndex(index);
    }

    removeByIndex(index: number) {
        if (index > -1) {
            this.floors.splice(index, 1);
        }

        // also http post
    }
}
