import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Floor } from '../models/floor';
import { DataService } from '../../app/services/data.service';


@Injectable()
export class FloorService extends DataService<Floor> {

    protected get KEY() {
        return 'number';
    }

    constructor(protected http: Http) {
        super();
    }

    getFloorByWorkerId(id: string) {
        return this.getAll()
            .flatMap<Floor>(array => Observable.from(array, null, null, null))
            .filter(floor => floor.seats.filter(seat => seat.worker === id).length > 0);
    }

    getFloorByRoomId(id: string) {
        return this.getAll()
            .flatMap<Floor>(array => Observable.from(array, null, null, null))
            .filter(floor => floor.places.filter(place => place.id === id).length > 0);
    }

    setFloor(floor: Floor) {
        let headers = new Headers(),
            body =  JSON.stringify(floor);

        headers.append('Content-Type', 'application/json');

        this.http.post('/setfloor', body, {headers: headers})
            .subscribe();
    }

    request() {
        this.http.get('/getfloors')
            .subscribe((floors) => console.log('floors', JSON.parse(floors._body)));

        return this.http.get('/public/mocks/floors.json')
            .map(response => response.json())
            .flatMap<Floor>(array => Observable.from(array, null, null, null))
            .map(floor => {
                //this.setFloor(floor);
                return new Floor(floor)
            })
            .share();
    }
}
