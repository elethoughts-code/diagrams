import {Linear} from '../core/Primitives'
import {GraphicsElement, SVG_NS} from './Definitons'
import {Point} from '../core/Common'

export class PathElement implements Linear, GraphicsElement<SVGPathElement> {

    constructor(
        public path: Point[],
        public markerStart: string = null,
        public markerEnd: string = null,
        public markerMid: string = null,
        public stroke: string = 'black',
        public fill: string = 'transparent') { }

    create(): SVGPathElement {
        const element = document.createElementNS(SVG_NS, 'path')
        let d = `M${this.path[0].getX()} ${this.path[0].getY()}`

        this.path.slice(1).forEach(p => {
            d+=` L${p.getX()} ${p.getY()}`
        })

        element.setAttribute('d', d)
        element.setAttribute('stroke', this.stroke)
        element.setAttribute('fill', this.fill)

        if (this.markerStart){
            element.setAttribute('marker-start', `url(#${this.markerStart})`)
        }
        if (this.markerMid){
            element.setAttribute('marker-mid', `url(#${this.markerMid})`)
        }
        if (this.markerEnd){
            element.setAttribute('marker-end', `url(#${this.markerEnd})`)
        }
        return element
    }

    getPath(): Point[] {
        return this.path
    }
}
