import { MarkerElement, SVG_NS } from './Definitons'


export class ArrowMarker implements MarkerElement {

    constructor(public orient: string = 'auto',
                public fill: string = 'black') { }

    create(): SVGMarkerElement {
        const marker = document.createElementNS(SVG_NS, 'marker')
        marker.setAttribute('markerWidth', '5')
        marker.setAttribute('markerHeight', '10')
        marker.setAttribute('refX', '5')
        marker.setAttribute('refY', '5')
        marker.setAttribute('orient', this.orient)

        const path = document.createElementNS(SVG_NS, 'path')
        path.setAttribute('d', 'M0,0 l0,10 l5,-5 z')
        path.setAttribute('fill', this.fill)

        marker.appendChild(path)

        return marker
    }
}
