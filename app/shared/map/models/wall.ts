import { Point } from './point';

export interface Wall {
    type: string;
    color: string;
    start: Point;
    end: Point;
    vertex?: Point;
}
