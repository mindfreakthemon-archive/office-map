import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import { Room, IRoom, RoomType } from '../models/room';
import { DataService } from '../../app/services/data.service';
import { MeetingRoom, IMeetingRoom } from '../models/meeting.room';
import { TeamRoom, ITeamRoom } from '../models/team.room';
import { UtilityRoom, IUtilityRoom } from '../models/utility.room';


@Injectable()
export class RoomService extends DataService<Room> {
    constructor(protected http: Http) {
        super(http);
    }
    
    protected create(data: IRoom) {
        switch (data.type) {
            case RoomType.MEETING:
                return new MeetingRoom(<IMeetingRoom> data);
            case RoomType.TEAM:
                return new TeamRoom(<ITeamRoom> data);
            case RoomType.UTILITY:
                return new UtilityRoom(<IUtilityRoom> data);
            default:
                // as a backward compatibility support
                return new MeetingRoom(<IMeetingRoom> data);
        }
    }

    protected get PUT_ENDPOINT() {
        return '/api/setroom';
    }

    protected get LOAD_ENDPOINT() {
        return '/api/getrooms';
    }

    protected get REMOVE_ENDPOINT() {
        return '/api/deleteroom';
    }
}
