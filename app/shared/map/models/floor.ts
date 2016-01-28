import { Wall } from './wall';
import { Place } from './place';

export class Floor {

    number: number;
    walls: Wall[];
    places: Place[];
    seats: any[];

    constructor({ number, walls, places, seats }: { number: number, walls: Wall[], places: Place[], seats: any[] }) {
        this.number = number;
        this.walls = walls;
        this.places = places;
        this.seats = seats;
    }
}
