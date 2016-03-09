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

        this.http.post('/setroom', body, {headers: headers})
            .subscribe();
    }

    request() {
        this.http.get('/getrooms')
            .subscribe((rooms) => console.log('rooms', JSON.parse(rooms._body)));

        return this.http.get('/public/mocks/rooms.json')
            .map(response => response.json())
            .flatMap<Room>(array => Observable.from(array, null, null, null))
            .map(room => {
                //this.setRoom(room);
                return new Room(room)
            })
            .share();
    }
}
