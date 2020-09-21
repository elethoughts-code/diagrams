import { Rectangular } from '../core/Primitives'
import { GraphicsElement, SVG_NS } from './Definitons'
import { Point } from '../core/Common'

export class HtmlForeignElement implements Rectangular, GraphicsElement<SVGForeignObjectElement> {

    element: SVGForeignObjectElement

    constructor(
        public origin: Point,
        public width: number,
        public height: number,
        public content: HTMLElement) { }

    create(): SVGForeignObjectElement {
        const element = document.createElementNS(SVG_NS, 'foreignObject')

        element.setAttribute('width', `${this.width}`)
        element.setAttribute('height', `${this.height}`)

        element.setAttribute('x', `${this.origin.getX()}`)
        element.setAttribute('y', `${this.origin.getY()}`)

        element.appendChild(this.content)

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
