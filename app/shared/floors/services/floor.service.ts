import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Floor } from '../models/floor';
import { DataService } from '../../app/services/data.service';

import { IRoom } from '../../rooms/models/room';
import { Place } from '../../map/models/place';


@Injectable()
export class FloorService extends DataService<Floor> {

    protected get KEY() {
        return 'number';
    }

    constructor(protected http: Http) {
        super(http);
    }

    protected create(data) {
        return new Floor(data);
    }

    protected get PUT_ENDPOINT() {
        return '/api/setfloor';
    }

    protected get LOAD_ENDPOINT() {
        return '/api/getfloors';
    }

    protected get REMOVE_ENDPOINT() {
        return '/api/deletefloor';
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
}
