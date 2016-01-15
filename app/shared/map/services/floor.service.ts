import { Inject, Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Floor } from '../models/floor';

@Injectable()
export class FloorService {
    private floors:Floor[];

    constructor(@Inject(Http) private http:Http) {
        this.floors = [new Floor(20)];
    }

    getFloors():Promise<Floor[]> {
        return this.http.get('/public/mocks/floors.json')
            .map(response => response.json())
            .toPromise();
    }
}
