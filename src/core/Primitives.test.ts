import {Direction, point, Point, Position} from './Common'
import {
    Circle,
    Diamond, diamondFromCircle,
    diamondFromEdgy, edgyFromRectangular,
    Linear,
    linearDirection,
    linearOrigin,
    linearTarget,
    originFromEdgy,
    Rectangular
} from './Primitives'
import {diamondEq, pointEq} from '../test-utilities/units'

describe('linear components and utility functions', () => {

    function linear(p: Point[]): Linear {
        return { getPath: () => p  }
    }

    it('should calculate origin and target of linear components', () => {
        // Given
        const l1 = linear(undefined)
        const l2 = linear(null)
        const l3 = linear([])
        const l4 = linear([point(1,2)])
        const l5 = linear([point(1,2), point(3,10)])
        const l6 = linear([point(1,2), point(3,10), point(13,7)])

        // When
        const o1 = linearOrigin(l1)
        const t1 = linearTarget(l1)

        const o2 = linearOrigin(l2)
        const t2 = linearTarget(l2)

        const o3 = linearOrigin(l3)
        const t3 = linearTarget(l3)

        const o4 = linearOrigin(l4)
        const t4 = linearTarget(l4)

        const o5 = linearOrigin(l5)
        const t5 = linearTarget(l5)

        const o6 = linearOrigin(l6)
        const t6 = linearTarget(l6)

        // then
        expect(o1).toBe(null)
        expect(t1).toBe(null)

        expect(o2).toBe(null)
        expect(t2).toBe(null)

        expect(o3).toBe(null)
        expect(t3).toBe(null)

        expect(pointEq(o4, point(1, 2))).toBe(true)
        expect(pointEq(t4, point(1,2))).toBe(true)

        expect(pointEq(o5, point(1,2))).toBe(true)
        expect(pointEq(t5, point(3,10))).toBe(true)

        expect(pointEq(o6, point(1,2))).toBe(true)
        expect(pointEq(t6, point(13,7))).toBe(true)
    })

    it('should throws exception when direction cannot be calculated', () => {
        // Given
        const l1 = linear(undefined)
        const l2 = linear(null)
        const l3 = linear([])
        const l4 = linear([point(1,2)])
        const l5 = linear([point(1,2),point(1,2)])
        const l6 = linear([point(1,2), point(1,2),point(1,2)])

        // Expect throws
        expect(() => linearDirection(l1)).toThrow(new Error('Cannot calculate direction'))
        expect(() => linearDirection(l2)).toThrow(new Error('Cannot calculate direction'))
        expect(() => linearDirection(l3)).toThrow(new Error('Cannot calculate direction'))
        expect(() => linearDirection(l4)).toThrow(new Error('Cannot calculate direction'))
        expect(() => linearDirection(l5)).toThrow(new Error('Cannot calculate direction'))
        expect(() => linearDirection(l6)).toThrow(new Error('Cannot calculate direction'))
    })

    it('should calculate linear target direction (1)', () => {
        // Given
        const l1 = linear([point(0,2),point(0,3)])
        const l2 = linear([point(0,3),point(0,2)])
        const l3 = linear([point(2,0),point(3,0)])
        const l4 = linear([point(3,0),point(2,0)])

        // Expect
        expect(linearDirection(l1)).toBe(Direction.top)
        expect(linearDirection(l2)).toBe(Direction.bottom)
        expect(linearDirection(l3)).toBe(Direction.right)
        expect(linearDirection(l4)).toBe(Direction.left)
    })

    it('should calculate linear target direction (2)', () => {
        // Given
        const l1 = linear([ point(0,2), point(4,2), point(0,2),point(0,3)])
        const l2 = linear([ point(0,2), point(4,2), point(0,3),point(0,2)])
        const l3 = linear([ point(0,2), point(4,2), point(2,0),point(3,0)])
        const l4 = linear([ point(0,2), point(4,2), point(3,0),point(2,0)])

        // Expect
        expect(linearDirection(l1)).toBe(Direction.top)
        expect(linearDirection(l2)).toBe(Direction.bottom)
        expect(linearDirection(l3)).toBe(Direction.right)
        expect(linearDirection(l4)).toBe(Direction.left)
    })

    it('should calculate linear target direction (3)', () => {
        // Given
        const l1 = linear([point(0,2),point(1,3)])
        const l2 = linear([point(0,3),point(-1,2)])
        const l3 = linear([point(2,0),point(3,6)])
        const l4 = linear([point(3,0),point(2,-1)])
        const l5 = linear([point(100000,0),point(0,-1)])
        const l6 = linear([point(100000,0),point(0,1)])

        // Expect
        expect(linearDirection(l1)).toBe(Direction.top)
        expect(linearDirection(l2)).toBe(Direction.bottom)
        expect(linearDirection(l3)).toBe(Direction.top)
        expect(linearDirection(l4)).toBe(Direction.bottom)
        expect(linearDirection(l5)).toBe(Direction.bottom)
        expect(linearDirection(l6)).toBe(Direction.top)
    })
})

describe('diamond components and utility functions', () => {
    function diamond(t,r,b,l: Point): Diamond {
        return {
            getTop: () => t,
            getBottom: () => b,
            getLeft: () => l,
            getRight: () => r
        }
    }

    it('should calculate diamond from edgy point', () => {

        // Given / When
        const d1 = diamondFromEdgy(point(0,0), Direction.top, 50)
        const d2 = diamondFromEdgy(point(10,20), Direction.top, 50)

        const d3 = diamondFromEdgy(point(0,0), Direction.bottom, 50)
        const d4 = diamondFromEdgy(point(10,20), Direction.bottom, 50)

        const d5 = diamondFromEdgy(point(0,0), Direction.right, 50)
        const d6 = diamondFromEdgy(point(10,20), Direction.right, 50)

        const d7 = diamondFromEdgy(point(0,0), Direction.left, 50)
        const d8 = diamondFromEdgy(point(10,20), Direction.left, 50)

        // Then
        expect(diamondEq(d1, diamond(point(0,0), point(50, 50), point(0, 100), point(-50, 50)))).toBe(true)
        expect(diamondEq(d2, diamond(point(10,20), point(60, 70), point(10,120), point(-40,70)))).toBe(true)

        expect(diamondEq(d3, diamond(point(0, -100), point(50, -50), point(0,0), point(-50, -50)))).toBe(true)
        expect(diamondEq(d4, diamond(point(10, -80), point(60, -30), point(10,20), point(-40, -30)))).toBe(true)

        expect(diamondEq(d5, diamond(point(-50, -50), point(0,0), point(-50, 50), point(-100,0)))).toBe(true)
        expect(diamondEq(d6, diamond(point(-40, -30), point(10,20), point(-40, 70), point(-90,20)))).toBe(true)

        expect(diamondEq(d7, diamond(point(50, -50), point(100,0), point(50, 50), point(0,0)))).toBe(true)
        expect(diamondEq(d8, diamond(point(60, -30), point(110,20), point(60, 70), point(10,20)))).toBe(true)
    })
})

describe('rectangular components and utility functions', () => {

    function rect(o: Point, w: number, h: number): Rectangular {
        return {
            getHeight: () => h,
            getWidth: () => w,
            getOrigin: () => o
        }
    }

    it('should calculate origin from an edgy point (1)', () => {
        // Given
        const r = rect(null, 100, 60)
        const p = point(10,20)

        // when
        const o1 = originFromEdgy(r, p, Direction.top, Position.start)
        const o2 = originFromEdgy(r, p, Direction.top, Position.end)
        const o3 = originFromEdgy(r, p, Direction.top, Position.middle)
        const o4 = originFromEdgy(r, p, Direction.top, 30)

        // then
        expect(pointEq(o1, point(10,20))).toBe(true)
        expect(pointEq(o2, point(-90,20))).toBe(true)
        expect(pointEq(o3, point(-40,20))).toBe(true)
        expect(pointEq(o4, point(-20,20))).toBe(true)
    })

    it('should calculate origin from an edgy point (2)', () => {
        // Given
        const r = rect(null, 100, 60)
        const p = point(10,20)

        // when
        const o1 = originFromEdgy(r, p, Direction.bottom, Position.start)
        const o2 = originFromEdgy(r, p, Direction.bottom, Position.end)
        const o3 = originFromEdgy(r, p, Direction.bottom, Position.middle)
        const o4 = originFromEdgy(r, p, Direction.bottom, 30)

        // then
        expect(pointEq(o1, point(10,-40))).toBe(true)
        expect(pointEq(o2, point(-90,-40))).toBe(true)
        expect(pointEq(o3, point(-40,-40))).toBe(true)
        expect(pointEq(o4, point(-20,-40))).toBe(true)
    })

    it('should calculate origin from an edgy point (3)', () => {
        // Given
        const r = rect(null, 100, 60)
        const p = point(10,20)

        // when
        const o1 = originFromEdgy(r, p, Direction.left, Position.start)
        const o2 = originFromEdgy(r, p, Direction.left, Position.end)
        const o3 = originFromEdgy(r, p, Direction.left, Position.middle)
        const o4 = originFromEdgy(r, p, Direction.left, 20)

        // then
        expect(pointEq(o1, point(10,20))).toBe(true)
        expect(pointEq(o2, point(10,-40))).toBe(true)
        expect(pointEq(o3, point(10,-10))).toBe(true)
        expect(pointEq(o4, point(10,0))).toBe(true)
    })

    it('should calculate origin from an edgy point (4)', () => {
        // Given
        const r = rect(null, 100, 60)
        const p = point(10,20)

        // when
        const o1 = originFromEdgy(r, p, Direction.right, Position.start)
        const o2 = originFromEdgy(r, p, Direction.right, Position.end)
        const o3 = originFromEdgy(r, p, Direction.right, Position.middle)
        const o4 = originFromEdgy(r, p, Direction.right, 20)

        // then
        expect(pointEq(o1, point(-90,20))).toBe(true)
        expect(pointEq(o2, point(-90,-40))).toBe(true)
        expect(pointEq(o3, point(-90,-10))).toBe(true)
        expect(pointEq(o4, point(-90,0))).toBe(true)
    })

    it('should get edge point from rectangle (1)', () => {
        // Given
        const r = rect(point(10,20), 100, 60)

        // When
        const e1 = edgyFromRectangular(r, Direction.top, Position.start)
        const e2 = edgyFromRectangular(r, Direction.top, Position.end)
        const e3 = edgyFromRectangular(r, Direction.top, Position.middle)
        const e4 = edgyFromRectangular(r,  Direction.top, 20)

        // Then
        expect(pointEq(e1, point(10,20))).toBe(true)
        expect(pointEq(e2, point(110,20))).toBe(true)
        expect(pointEq(e3, point(60,20))).toBe(true)
        expect(pointEq(e4, point(30,20))).toBe(true)
    })

    it('should get edge point from rectangle (2)', () => {
        // Given
        const r = rect(point(10,20), 100, 60)

        // When
        const e1 = edgyFromRectangular(r, Direction.bottom, Position.start)
        const e2 = edgyFromRectangular(r, Direction.bottom, Position.end)
        const e3 = edgyFromRectangular(r, Direction.bottom, Position.middle)
        const e4 = edgyFromRectangular(r,  Direction.bottom, 20)

        // Then
        expect(pointEq(e1, point(10,80))).toBe(true)
        expect(pointEq(e2, point(110,80))).toBe(true)
        expect(pointEq(e3, point(60,80))).toBe(true)
        expect(pointEq(e4, point(30,80))).toBe(true)
    })

    it('should get edge point from rectangle (3)', () => {
        // Given
        const r = rect(point(10,20), 100, 60)

        // When
        const e1 = edgyFromRectangular(r, Direction.left, Position.start)
        const e2 = edgyFromRectangular(r, Direction.left, Position.end)
        const e3 = edgyFromRectangular(r, Direction.left, Position.middle)
        const e4 = edgyFromRectangular(r,  Direction.left, 20)

        // Then
        expect(pointEq(e1, point(10,20))).toBe(true)
        expect(pointEq(e2, point(10,80))).toBe(true)
        expect(pointEq(e3, point(10,50))).toBe(true)
        expect(pointEq(e4, point(10,40))).toBe(true)
    })

    it('should get edge point from rectangle (4)', () => {
        // Given
        const r = rect(point(10,20), 100, 60)

        // When
        const e1 = edgyFromRectangular(r, Direction.right, Position.start)
        const e2 = edgyFromRectangular(r, Direction.right, Position.end)
        const e3 = edgyFromRectangular(r, Direction.right, Position.middle)
        const e4 = edgyFromRectangular(r,  Direction.right, 20)

        // Then
        expect(pointEq(e1, point(110,20))).toBe(true)
        expect(pointEq(e2, point(110,80))).toBe(true)
        expect(pointEq(e3, point(110,50))).toBe(true)
        expect(pointEq(e4, point(110,40))).toBe(true)
    })

})


describe('Circle components and utility functions', () => {
    it('should calculate diamond points from circle', () => {
        // Given
        const c: Circle = {
            getRadius(): number { return 30 },
            getCenter(): Point { return point(10,15) }
        }

        // When
        const d = diamondFromCircle(c)

        // Then
        expect(diamondEq(d, {
            getTop(): Point { return point(10, -15)  },
            getBottom(): Point { return point(10, 45)  },
            getLeft(): Point { return point(-20, 15)  },
            getRight(): Point { return point(40, 15)  },
        })).toBe(true)
    })
})
