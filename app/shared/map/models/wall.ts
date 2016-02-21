import { Point } from './point';

export class Wall {
    constructor(public type: string, public color: string, public start: Point, public end: Point, public vertex?: Point) {}
}
