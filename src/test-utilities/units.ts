import {Point} from '../core/Common'
import {Diamond} from '../core/Primitives'

export function pointEq(p1, p2: Point): boolean {
    if(!p1 || !p2) {
        return p1 === p2
    }
    return p1.getX() === p2.getX() && p1.getY() === p2.getY()
}

export function pathEq(path1: Point[], path2: Point[]): boolean {
    if(!path1 || !path2) {
        return path1 === path1
    }
    if(path1.length !== path2.length) {
        return false
    }
    for(let i =0; i < path1.length; i ++) {
        if(!pointEq(path1[i], path2[i])) {
            return false
        }
    }
    return true
}

export function diamondEq(d1, d2: Diamond): boolean {
    if(!d1 || !d2) {
        return d1 === d2
    }
    return  pointEq(d1.getTop(), d2.getTop()) &&
        pointEq(d1.getBottom(), d2.getBottom()) &&
        pointEq(d1.getLeft(), d2.getLeft()) &&
        pointEq(d1.getRight(), d2.getRight())
}
