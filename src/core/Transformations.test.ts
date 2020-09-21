import {Point, point} from './Common'
import {horizontal, translate, vertical} from './Transformations'

function pointEq(p1, p2: Point): boolean {
    if(!p1 || !p2) {
        return p1 === p2
    }
    return p1.getX() === p2.getX() && p1.getY() === p2.getY()
}

it('should calculate basic transformations', () => {
    expect(pointEq(translate(point(10, 20), point(20, 30)), point(30, 50))).toBe(true)
    expect(pointEq(vertical(point(10, 20), 15), point(10, 35))).toBe(true)
    expect(pointEq(horizontal(point(10, 20), 15), point(25, 20))).toBe(true)
})
