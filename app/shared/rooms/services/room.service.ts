import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Room } from '../models/room';
import { DataService } from '../../app/services/data.service';


@Injectable()
export class RoomService extends DataService<Room> {

    constructor(protected http: Http) {
        super();
    }

    protected _put(room: Room) {
        let headers = new Headers(),
            body =  JSON.stringify(room);

        headers.append('Content-Type', 'application/json');

        return this.http.post('/api/setroom', body, { headers: headers });
    }

    protected _load() {
        return this.http.get('/api/getrooms')
            .map(response => response.json())
            .flatMap<Room>(array => Observable.from(array, null, null, null))
            .map(room => new Room(room))
            .share();
    }
}
