import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Room } from '../models/room';
import { DataService } from '../../app/services/data.service';


@Injectable()
export class RoomService extends DataService<Room> {
    constructor(protected http: Http) {
        super(http);
    }
    
    protected create(data) {
        return new Room(data);
    }

    protected get PUT_ENDPOINT() {
        return '/api/setroom';
    }

    protected get LOAD_ENDPOINT() {
        return '/api/getrooms';
    }
}
