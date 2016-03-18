import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import uuid = require('node-uuid');


@Injectable()
export class DataService<T> {
    protected items: T[];
    protected http: Http;

    constructor() {
    }

    protected get KEY() {
        return 'id';
    }

    protected _load(): Observable<T> {
        throw new Error('not implemented');
    }

    protected _put(item: T): Observable<any> {
        throw new Error('not implemented');
    }

    protected _remove(item: T): Observable<any> {
        throw new Error('not implemented');
    }


    protected load(): Observable<T[]> {
        if (this.items) {
            return Observable.of(this.items);
        }

        return this._load()
            .toArray()
            .do(items => this.items = items)
            .share();
    }

    purge() {
        this.items = null;
    }

    getEach() {
        return this.load()
            .flatMap<T>(array => Observable.from(array, null, null, null));
    }

    getAll() {
        return this.load();
    }

    get(id: string) {
        return this.getEach()
            .filter(_item => _item[this.KEY] === id);
    }

    first() {
        return this.getEach()
            .first();
    }

    index(item: T) {
        return this.items.findIndex(_item => _item[this.KEY] === item[this.KEY]);
    }

    has(item: T) {
        return this.index(item) > -1;
    }

    put(item: T) {
        if (!item[this.KEY]) {
            item[this.KEY] = uuid.v4();
        }

        if (this.has(item)) {
            this.items.splice(this.index(item), 1, item);

            return this._put(item);
        } else {
            this.items.push(item);

            return this._put(item);
        }
    }

    remove(item: T) {
        if (this.has(item)) {
            this.items.splice(this.index(item), 1);

            return this._remove(item);
        }

        return Observable.of(false);
    }
}
