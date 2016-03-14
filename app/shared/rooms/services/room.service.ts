import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Room } from '../models/room';
import { DataService } from '../../app/services/data.service';


@Injectable()
export class RoomService extends DataService<Room> {

    constructor(protected http: Http) {
        super();
    }

    setRoom(room: Room) {
        let headers = new Headers(),
            body =  JSON.stringify(room);

        headers.append('Content-Type', 'application/json');

        return this.http.post('/setroom', body, {headers: headers});
    }

    request() {
        return this.http.get('/getrooms')
            .map(response => response.json())
            .flatMap<Room>(array => Observable.from(array, null, null, null))
            .map(room => new Room(room))
            .share();
    }
}
