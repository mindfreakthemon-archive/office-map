import { Wall } from '../../map/models/wall';
import { Place } from '../../map/models/place';
import { Seat } from '../../map/models/seat';
import { Worker } from '../../workers/models/worker';

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
        this.seats = seats || [];
    }

    addSeat(latlng: L.LatLng) {
        this.seats.push(new Seat({ x: latlng.lat, y: latlng.lng }));
    }

    lastSeat() {
        return this.seats[this.seats.length - 1];
    }

    setWorkerOnSeat(seat: Seat, worker: Worker) {
        seat.worker = worker;
    }
}
