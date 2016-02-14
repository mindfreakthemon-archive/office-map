
interface IRoom {
    id: number;
    name: string;
    flag: string;
}

export class Room {

    id: number;
    name: string;
    flag: string;

    constructor({ id, name, flag }: IRoom) {
        this.id = id;
        this.name = name;
        this.flag = flag;
    }
}
