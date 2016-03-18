import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import uuid = require('node-uuid');

import { Serializable } from '../common/serializable';


@Injectable()
export class DataService<T extends Serializable> {
    protected items: T[];

    constructor(protected http: Http) {
    }

    protected get KEY() {
        return 'id';
    }

    protected create(data: any): T {
        throw new Error('not implemented');
    }

    protected get PUT_ENDPOINT(): string {
        throw new Error('not implemented');
    }

    protected get LOAD_ENDPOINT(): string {
        throw new Error('not implemented');
    }

    protected get REMOVE_ENDPOINT(): string {
        throw new Error('not implemented');
    }

    protected _post(enpoint: string, item: T): Observable<any> {
        let headers = new Headers(),
            body = JSON.stringify(item.toJSON());

        headers.append('Content-Type', 'application/json');

        return this.http.post(enpoint, body, { headers: headers });
    }

    protected load(): Observable<T[]> {
        if (this.items) {
            return Observable.of(this.items);
        }

        //noinspection TypeScriptValidateTypes
        return this.http.get(this.LOAD_ENDPOINT)
            .map(response => response.json())
            .flatMap<T>(array => Observable.from(array, null, null, null))
            .map(item => this.create(item))
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
        } else {
            this.items.push(item);
        }

        return this._post(this.PUT_ENDPOINT, item);
    }

    remove(item: T) {
        if (this.has(item)) {
            this.items.splice(this.index(item), 1);

            return this._post(this.REMOVE_ENDPOINT, item);
        }

        return Observable.of(false);
    }
}
