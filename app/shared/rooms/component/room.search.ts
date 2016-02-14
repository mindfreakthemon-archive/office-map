import { Component, Input, OnChanges, SimpleChange } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { RoomItem } from './room.item';
import { FilterUtils } from '../../app/utils/filter.utils';


@Component({
    selector: 'room-search',
    templateUrl: 'rooms/templates/room.search.jade',
    directives: [ROUTER_DIRECTIVES, PaginationControlsCmp, RoomItem],
    pipes: [PaginatePipe],
    providers: [PaginationService]
})
export class RoomSearch implements OnChanges {
    rooms: Room[];

    @Input() query: string = '';
    @Input() itemsPerPage = 10;

    constructor(public roomService: RoomService) {}

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['query']) {
            this.request();
        }
    }

    request() {
        this.rooms = null;

        this.roomService.getEach()
            .filter(FilterUtils.searchFilter(this.query, ['name']))
            .toArray()
            .subscribe(rooms => this.rooms = rooms);
    }
}
