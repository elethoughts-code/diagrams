import {Circle, Rectangular} from '../core/Primitives'
import {GraphicsElement, SVG_NS} from './Definitons'
import {Point} from '../core/Common'

export class CircleElement implements Circle, GraphicsElement<SVGCircleElement> {

    constructor(public center: Point,
                public radius: number,
                public stroke= 'black',
                public fill = 'black') {}

    create(): SVGCircleElement {
        const element = document.createElementNS(SVG_NS, 'circle')


        element.setAttribute('cx', `${this.center.getX()}`)
        element.setAttribute('cy', `${this.center.getY()}`)
        element.setAttribute('r', `${this.getRadius()}`)

        element.setAttribute('stroke', `${this.stroke}`)
        element.setAttribute('fill', `${this.fill}`)

        return element
    }

    getCenter(): Point {
        return this.center
    }

    getRadius(): number {
        return this.radius
    }
}
