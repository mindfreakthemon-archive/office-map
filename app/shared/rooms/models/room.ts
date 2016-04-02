import { Point } from '../../map/models/point';
import { Serializable } from '../../app/common/serializable';

export enum RoomType {
    MEETING,
    TEAM,
    UTILITY
}

export interface IRoom {
    id: string;
    name: string;
    icon: string;
    position: Point;
    type: RoomType;
}

export const ROOM_DEFAULT_SKELETON: IRoom = {
    id: null,
    name: '',
    icon: null,
    position: null,
    type: RoomType.MEETING
};

export abstract class Room implements Serializable {

    static ROOM_TYPES_MAP = new Map<RoomType, string>(<Array<any>> [
        [RoomType.MEETING, 'Meeting Room'],
        [RoomType.TEAM, 'Team Room'],
        [RoomType.UTILITY, 'Utility Room'],
    ]);
    
    public id: string;
    public name: string;
    public icon: string;
    public position: Point;
    public type: RoomType;

    constructor({ id, name, icon, position, type }: IRoom = ROOM_DEFAULT_SKELETON) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.position = position;
        this.type = type;
    }

    public toJSON(): IRoom {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            position: this.position,
            type: this.type
        };
    }
}
