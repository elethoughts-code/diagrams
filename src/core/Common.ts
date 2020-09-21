
export enum Direction {
    top     = 'top',
    bottom  = 'bottom',
    left    = 'left',
    right   = 'right'
}

export function opposite(direction: Direction): Direction {
    switch(direction) {
        case Direction.top      : return Direction.bottom
        case Direction.bottom   : return Direction.top
        case Direction.left     : return Direction.right
        case Direction.right    : return Direction.left
    }
}

export enum Position {
    start  = 'start',
    end    = 'end',
    middle = 'middle'
}

export type Offset = number | Position

export interface Point {

    getX(): number

    getY(): number
}

export type Vector = Point

export function vector(p1: Point, p2: Point): Vector{
    return {
        getX(): number {
            return p2.getX() - p1.getX()
        },

        getY(): number {
            return p2.getY() - p1.getY()
        }
    }
}

export function norm(v: Vector): number {
    return Math.sqrt(v.getX() * v.getX() + v.getY() * v.getY())
}

export function point(x,y: number): Point {
    return {
        getX(): number {
            return x
        },
        getY(): number {
            return y
        }
    }
}
