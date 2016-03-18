import { Point } from '../../map/models/point';
import { Serializable } from '../../app/common/serializable';

export interface IRoom {
    id: string;
    name: string;
    icon: string;
    flag: string;
    floor?: string;
    position: Point;
}

const ROOM_DEFAULT_SKELETON: IRoom = { id: null, icon: null, flag: null, name: '', floor: null, position: null };


export class Room implements Serializable, IRoom {

    id: string;
    name: string;
    icon: string;
    flag: string;
    floor: string;
    position: Point;

    constructor({ id, name, icon, flag, floor, position }: IRoom = ROOM_DEFAULT_SKELETON) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.flag = flag;
        this.floor = floor;
        this.position = position;
    }

    toJSON(): IRoom {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            flag: this.flag,
            floor: this.floor,
            position: this.position
        };
    }
}
