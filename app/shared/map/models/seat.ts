import { Worker } from '../../workers/models/worker';
import { Point } from './point';

export class Seat {
    constructor(public position: Point, public worker?: string) {
    }
}
