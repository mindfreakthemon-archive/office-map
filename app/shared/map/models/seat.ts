import { Place } from './place';
import { Worker } from '../../staff/models/worker';
import { Point } from './point';

export class Seat extends Place {
    constructor(public position: Point, public worker: Worker) {
        super(position);
    }
}
