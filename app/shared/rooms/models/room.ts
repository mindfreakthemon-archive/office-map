import { Point } from '../../map/models/point';

export interface IRoom {
    id: string;
    name: string;
    icon: string;
    flag: string;
    floor?: string;
    position: Point;
}

const ROOM_DEFAULT_SKELETON: IRoom = { id: null, icon: null, flag: null, name: '', floor: null, position: null };


export class Room implements IRoom {

    id: string;
    name: string;
    icon: string;
    flag: string;
    floor: string;
    position: Point;

    constructor({ id, name, icon, flag, floor, position}: IRoom = ROOM_DEFAULT_SKELETON) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.flag = flag;
        this.floor = floor;
        this.position = position;
    }
}
