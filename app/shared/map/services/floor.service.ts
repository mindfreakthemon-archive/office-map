import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Floor } from '../models/floor';

@Injectable()
export class FloorService {
    floors: Floor[];

    constructor(private http: Http) {}

    getFloors(): Promise<Floor[]> {
        if (this.floors) {
            return Promise.resolve(this.floors.slice(0));
        }

        return this.http.get('/public/mocks/floors.json')
            .map(response => response.json())
            .map(floors => this.floors = floors)
            .toPromise();
    }

    getFloor(number: number): Promise<Floor> {
        let promise = <Promise<Floor|Floor[]>> this.getFloors();

        return promise
            .then((floors: Floor[]) => {
                let list: Floor[] = floors.filter(floor => floor.number === number);

                if (!list.length) {
                    throw new Error('floor not found');
                }

                return list.shift();
            });
    }
}
