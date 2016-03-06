import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Room } from '../models/room';
import { DataService } from '../../app/services/data.service';


@Injectable()
export class RoomService extends DataService<Room> {

    constructor(protected http: Http) {
        super();
    }

    request() {
        return this.http.get('/public/mocks/rooms.json')
            .map(response => response.json())
            .flatMap<Room>(array => Observable.from(array, null, null, null))
            .map(floor => new Room(floor))
            .share();
    }
}
