import { Point } from '../../map/models/point';

export interface IRoom {
    id: string;
    name: string;
    floor?: string;
    position: Point;
}

const ROOM_DEFAULT_SKELETON: IRoom = { id: null, name: '', floor: null, position: null };


export class Room implements IRoom {

    id: string;
    name: string;
    floor: string;
    position: Point;

    constructor({ id, name, floor, position}: IRoom = ROOM_DEFAULT_SKELETON) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.position = position;
    }
}
