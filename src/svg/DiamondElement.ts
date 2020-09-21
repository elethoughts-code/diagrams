import { Direction, Point } from '../core/Common'
import { Diamond, diamondFromEdgy } from '../core/Primitives'
import { GraphicsElement, SVG_NS } from './Definitons'

export class DiamondElement implements Diamond, GraphicsElement<SVGPathElement> {

    readonly top: Point
    readonly bottom: Point
    readonly left: Point
    readonly right: Point

    constructor(private origin: Point,
                private originDir: Direction,
                private radius: number,
                public stoke = 'black',
                public fill = 'black') {

        const diamondPoints = diamondFromEdgy(origin, originDir, radius)
        this.top = diamondPoints.getTop()
        this.right = diamondPoints.getRight()
        this.bottom = diamondPoints.getBottom()
        this.left = diamondPoints.getLeft()
    }

    getTop(): Point {
        return this.top
    }

    getBottom(): Point {
        return this.bottom
    }

    getLeft(): Point {
        return this.left
    }

    getRight(): Point {
        return this.right
    }

    create(): SVGPathElement {
        const element = document.createElementNS(SVG_NS, 'path')
        const d = `M${this.top.getX()} ${this.top.getY()} ` +
            `L${this.right.getX()} ${this.right.getY()} ` +
            `L${this.bottom.getX()} ${this.bottom.getY()} ` +
            `L${this.left.getX()} ${this.left.getY()} Z`

        element.setAttribute('d', d)
        element.setAttribute('stroke', this.stoke)
        element.setAttribute('fill', this.fill)
        return element
    }
}
