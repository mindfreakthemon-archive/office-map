import { Wall } from './wall';
import { Place } from './place';

const FLOOR_DEFAULT_SKELETON = { number: null, walls: [], places: [], seats: [] };

export class Floor {

    number: number;
    walls: Wall[];
    places: Place[];
    seats: any[];

    constructor({ number, walls, places, seats }: { number: number, walls: Wall[], places: Place[], seats: any[] } = FLOOR_DEFAULT_SKELETON) {
        this.number = number;
        this.walls = walls;
        this.places = places;
        this.seats = seats;
    }
}
