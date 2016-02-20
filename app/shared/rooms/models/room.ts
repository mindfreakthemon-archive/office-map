import { Point } from '../../map/models/point';

interface IRoom {
    id: number;
    name: string;
    position: Point;
}

export class Room {

    id: number;
    name: string;
    floor: number;
    position: Point;

    constructor({ id, name, floor, position }: IRoom) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.position = position;
    }
}
