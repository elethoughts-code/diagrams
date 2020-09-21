import {Vector, Point, point} from './Common'

export function translate(p: Point, v: Vector): Point {
    return {
        getX(): number {
            return p.getX() + v.getX()
        },
        getY(): number {
            return p.getY() + v.getY()
        }
    }
}

export function vertical(p: Point, y: number): Point {
    return translate(p, point(0,y))
}

export function horizontal(p: Point, x: number): Point {
    return translate(p, point(x,0))
}

