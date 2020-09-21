import { Direction, Point, Position, Offset, vector, norm, point } from './Common'
import { translate, vertical, horizontal } from './Transformations'

/**
 * Linear components and utility functions
 */
export interface Linear {

    getPath(): Point[]
}

export function linearOrigin(linear: Linear): Point {
    const path = linear.getPath()
    return path && path.length > 0 ? path[0] : null
}

export function linearTarget(linear: Linear): Point {
    const path = linear.getPath()
    return path && path.length > 0 ? path[path.length - 1] : null
}

export function linearDirection(linear: Linear): Direction {
    const path = linear.getPath()
    if (!path || path.length < 2) {
        throw new Error('Cannot calculate direction')
    }
    const v = vector(path[path.length - 2], path[path.length - 1])
    if (v.getX() === 0 && v.getY() === 0) {
        return linearDirection({
            getPath() {
                return path.slice(0, path.length - 1)
            }
        })
    }

    const n = norm(v)
    const cosV = v.getX() / n
    const sinV = v.getY() / n

    if (sinV === 0 && cosV === 1) {
        return Direction.right
    }

    if (sinV === 0 && cosV === -1) {
        return Direction.left
    }

    if (sinV > 0) {
        return Direction.top
    }

    return Direction.bottom
}

/**
 * Diamond components and utility functions
 */
export interface Diamond {

    getTop(): Point

    getBottom(): Point

    getLeft(): Point

    getRight(): Point
}

export function diamondFromEdgy(origin: Point, originDir: Direction, radius: number): Diamond {
    switch (originDir) {
        case Direction.top: return {
            getTop: () => origin,
            getRight: () => translate(origin, point(radius, radius)),
            getBottom: () => vertical(origin, 2 * radius),
            getLeft: () => translate(origin, point(-radius, radius))
        }
        case Direction.bottom: return {
            getTop: () => vertical(origin, -2 * radius),
            getRight: () => translate(origin, point(radius, -radius)),
            getBottom: () => origin,
            getLeft: () => translate(origin, point(-radius, -radius))
        }
        case Direction.left: return {
            getTop: () => translate(origin, point(radius, -radius)),
            getRight: () => horizontal(origin, 2 * radius),
            getBottom: () => translate(origin, point(radius, radius)),
            getLeft: () => origin
        }
        case Direction.right: return {
            getTop: () => translate(origin, point(-radius, -radius)),
            getRight: () => origin,
            getBottom: () => translate(origin, point(-radius, radius)),
            getLeft: () => horizontal(origin, - 2 * radius)
        }
    }
}

/**
 * Rectangular components and utility functions
 */
export interface Rectangular {

    getOrigin(): Point

    getWidth(): number

    getHeight(): number
}

export function originFromEdgy(rect: Rectangular, p: Point, direction: Direction, offset: Offset): Point {
    return {
        getX() {
            const width = rect.getWidth()
            const height = rect.getHeight()

            const offsetCal = calculateOffset(width, height, direction, offset)

            switch (direction) {
                case Direction.top: return p.getX() - offsetCal
                case Direction.bottom: return p.getX() - offsetCal
                case Direction.left: return p.getX()
                case Direction.right: return p.getX() - width
            }
        },
        getY() {
            const width = rect.getWidth()
            const height = rect.getHeight()
            const offsetCal = calculateOffset(width, height, direction, offset)

            switch (direction) {
                case Direction.top: return p.getY()
                case Direction.bottom: return p.getY() - height
                case Direction.left: return p.getY() - offsetCal
                case Direction.right: return p.getY() - offsetCal
            }
        }
    }
}

export function edgyFromRectangular(rect: Rectangular, direction: Direction, offset: Offset): Point {

    return {
        getX() {
            const width = rect.getWidth()
            const height = rect.getHeight()
            const origin = rect.getOrigin()
            const offsetCal = calculateOffset(width, height, direction, offset)

            switch (direction) {
                case Direction.top: return origin.getX() + offsetCal
                case Direction.bottom: return origin.getX() + offsetCal
                case Direction.left: return origin.getX()
                case Direction.right: return origin.getX() + width
            }
        },
        getY() {
            const width = rect.getWidth()
            const height = rect.getHeight()
            const origin = rect.getOrigin()
            const offsetCal = calculateOffset(width, height, direction, offset)

            switch (direction) {
                case Direction.top: return origin.getY()
                case Direction.bottom: return origin.getY() + height
                case Direction.left: return origin.getY() + offsetCal
                case Direction.right: return origin.getY() + offsetCal
            }
        }
    }
}

function calculateOffset(width: number, height: number, direction: Direction, offset: Offset): number {
    if (typeof offset === 'number') {
        return offset
    }

    if (offset === Position.start) {
        return 0
    }

    if (direction === Direction.bottom || direction === Direction.top) {
        return offset === Position.end ? width : width / 2
    }

    if (direction === Direction.left || direction === Direction.right) {
        return offset === Position.end ? height : height / 2
    }
}

/**
 * Circle components and utility functions
 */
export interface Circle {

    getCenter(): Point

    getRadius(): number
}

export function diamondFromCircle(c: Circle): Diamond {
    return {
        getBottom(): Point {
            return vertical(c.getCenter(), c.getRadius())
        }, getLeft(): Point {
            return horizontal(c.getCenter(), -c.getRadius())
        }, getRight(): Point {
            return horizontal(c.getCenter(), c.getRadius())
        }, getTop(): Point {
            return vertical(c.getCenter(), -c.getRadius())
        }
    }
}
