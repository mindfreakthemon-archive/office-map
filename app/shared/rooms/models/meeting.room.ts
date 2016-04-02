import { Room, IRoom, RoomType, ROOM_DEFAULT_SKELETON } from './room';


export interface IMeetingRoom extends IRoom {
    capacity: number;
    description: string;
}

export const MEETING_ROOM_DEFAULT_SKELETON: MeetingRoom = Object.assign({
    capacity: null,
    description: ''
}, ROOM_DEFAULT_SKELETON);

export class MeetingRoom extends Room implements IMeetingRoom {
    capacity: number;
    description: string;

    constructor({ id, name, icon, position, capacity, description }: IMeetingRoom = MEETING_ROOM_DEFAULT_SKELETON) {
        super({ id, name, icon, position, type: RoomType.MEETING });

        this.capacity = capacity;
        this.description = description;
    }

    toJSON(): IMeetingRoom {
        return Object.assign({
            capacity: this.capacity,
            description: this.description
        }, super.toJSON());
    }
}
