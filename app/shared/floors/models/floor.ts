import { Wall } from '../../map/models/wall';
import { Place } from '../../map/models/place';
import { Seat } from '../../map/models/seat';
import { Point } from '../../map/models/point';
import { Worker } from '../../workers/models/worker';
import { IRoom } from '../../rooms/models/room';

const FLOOR_DEFAULT_SKELETON = { number: null, walls: [], places: [], seats: [] };

export class Floor {

    number: number;
    walls: Wall[];
    places: Place[];
    seats: any[];

    constructor({ number, walls, places, seats }: { number: number, walls: Wall[], places: Place[], seats: any[] } = FLOOR_DEFAULT_SKELETON) {
        this.number = number;
        this.walls = walls;
        this.places = places|| [];
        this.seats = seats || [];
    }

    addWall(type: string, color: string, start: Point, end: Point, vertex?: Point) {
        if (vertex) {
            this.walls.push(new Wall(type, color, start, end, vertex));
        } else {
            this.walls.push(new Wall(type, color, start, end));
        }


        window.floor = this;
    }

    addPlace(latlng, room: IRoom, icon: string) {
        this.places.push(new Place(room.id , room.name, icon, { x: latlng.lat, y: latlng.lng }, room.floor));
        window.floor = this;
    }

    lastPlace() {
        return this.places[this.places.length - 1];
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

    setWorkerOnSeat(seat: Seat, worker: string) {
        seat.worker = worker;
    }
}
