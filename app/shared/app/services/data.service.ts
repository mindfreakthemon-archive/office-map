import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService<T> {
    protected items: T[];
    protected http: Http;

    constructor() {}

    protected get KEY() {
        return 'id';
    }

    protected request(): Observable<T> {
        throw new Error('not implemented');
    }

    protected load(): Observable<T[]> {
        if (this.items) {
            return Observable.of(this.items);
        }

        return this.request()
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
        if (this.has(item)) {
            this.items.splice(this.index(item), 1, item);

            // do post
        } else {
            this.items.push(item);

            // do put
        }
    }

    remove(item: T) {
        if (this.has(item)) {
            this.items.splice(this.index(item), 1);

            // do delete
        }
    }
}
