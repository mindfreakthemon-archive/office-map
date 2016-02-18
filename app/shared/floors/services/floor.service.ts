import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
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

    request() {
        return this.http.get('/public/mocks/floors.json')
            .map(response => response.json())
            .flatMap<Floor>(array => Observable.from(array))
            .map(floor => new Floor(floor))
            .share();
    }
}
