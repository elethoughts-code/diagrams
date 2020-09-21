import {Rectangular} from '../core/Primitives'
import {Point} from '../core/Common'
import {GraphicsElement, SVG_NS} from './Definitons'

export class RectElement implements Rectangular, GraphicsElement<SVGRectElement> {

    constructor(public origin: Point,
                public width: number,
                public height: number,
                public stroke: string = 'black',
                public fill: string = 'none') { }

    create(): SVGRectElement {
        const element = document.createElementNS(SVG_NS, 'rect')


        element.setAttribute('width', `${this.width}`)
        element.setAttribute('height', `${this.height}`)

        element.setAttribute('x', `${this.origin.getX()}`)
        element.setAttribute('y', `${this.origin.getY()}`)

        element.setAttribute('stroke', `${this.stroke}`)

        element.setAttribute('fill', `${this.fill}`)
        return element
    }

    getOrigin(): Point {
        return this.origin
    }

    getWidth(): number {
        return this.width
    }

    getHeight(): number {
        return this.height
    }
}
