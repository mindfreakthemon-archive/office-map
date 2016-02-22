import { Point } from './point';

export class Place {
    constructor(public id: string, public name: string, public icon: string, public position: Point, public floor: number) {}
}
