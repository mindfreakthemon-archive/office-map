import { Wall } from '../../map/models/wall';
import { Place } from '../../map/models/place';
import { Seat } from '../../map/models/seat';
import { Point } from '../../map/models/point';
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

    addWall(type: string, color: string, start: Point, end: Point, vertex?: Point){
        this.walls.push({
            type: type,
            color: color,
            start: start,
            vertex: vertex,
            end: end
        });
    }

    lastWall() {
        return this.walls[this.walls.length - 1];
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
