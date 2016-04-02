import { Component, Input, Output, OnChanges, OnInit, SimpleChange, EventEmitter } from 'angular2/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { Room, RoomType } from '../models/room';
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
export class RoomSearch implements OnChanges, OnInit {
    rooms: Room[];

    /**
     * Toggles Edit and Delete button.
     */
    @Input()
    adminMode: boolean = false;

    /**
     * Toggles small query input field to filter with.
     */
    @Input()
    showQueryField: boolean = false;

    @Input()
    query: string = '';

    @Input()
    itemsPerPage = 10;

    @Output()
    results = new EventEmitter<Room[]>();

    roomTypes = Array.from(<any> Room.ROOM_TYPES_MAP);
    
    roomTypeFilter = new Set();

    constructor(public roomService: RoomService, private paginationService: PaginationService) {
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['query']) {
            this.setPage();
            this.request();
        }
    }

    ngOnInit() {
        this.request();
    }

    setQuery(query: string) {
        this.query = query;

        // also makes request on every change
        this.setPage();
        this.request();
    }

    setPage(page: number = 1) {
        this.paginationService
            .setCurrentPage(this.paginationService.defaultId, page);
    }

    setRoomTypeFilter(roomType: RoomType, show: boolean) {
        if (show) {
            this.roomTypeFilter.add(roomType);
        } else {
            this.roomTypeFilter.delete(roomType);
        }

        // also makes request on every change
        this.setPage();
        this.request();
    }

    request() {
        this.rooms = null;

        this.roomService.getEach()
            .filter(FilterUtils.searchFilter(this.query, ['name']))
            .filter((room: Room) => {
                if (this.roomTypeFilter.size) {
                    return this.roomTypeFilter.has(room.type);
                }

                return true;
            })
            .toArray()
            .subscribe(rooms => {
                this.rooms = rooms;
                this.results.emit(rooms);
            });
    }

    handleItemDelete() {
        this.request();
    }
}
