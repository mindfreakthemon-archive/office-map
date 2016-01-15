import { Inject, Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Floor } from '../models/floor';

@Injectable()
export class FloorService {
    constructor(private http: Http) {}

    getFloors(): Promise<Floor[]> {
        return this.http.get('/public/mocks/floors.json')
            .map(response => response.json())
            .toPromise();
    }
}
