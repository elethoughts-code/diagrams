import { GraphicsElement, MarkerElement, SVG_NS } from './Definitons'

export class Diagram implements GraphicsElement<SVGSVGElement> {

    constructor(
        public width: number,
        public height: number ){ }

    private markers = new Map<string,MarkerElement>()

    private layers = new Map<number, Set<GraphicsElement<any>>>()

    create(): SVGSVGElement {
        const element = document.createElementNS(SVG_NS, 'svg')

        element.setAttribute('width', `${this.width}`)
        element.setAttribute('height', `${this.height}`)
        element.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`)

        if(this.markers.size > 0) {
            const defElement = document.createElementNS(SVG_NS, 'defs')
            element.appendChild(defElement)

            this.markers.forEach((markerElement, key ) => {
                const svgElement = markerElement.create()
                svgElement.setAttribute('id', key)
                defElement.appendChild(svgElement)
            })
        }

        Array.from(this.layers.keys()).sort().forEach(layer => {
            const group = document.createElementNS(SVG_NS, 'g')
            element.appendChild(group)
            this.layers.get(layer).forEach(childElement => {
                group.appendChild(childElement.create())
            })
        })
        return element
    }

    addMaker(key: string, marker: MarkerElement) {
        this.markers.set(key, marker)
    }

    addChild(childElement: GraphicsElement<any>, layer: number = 0) {
        if (!this.layers.has(layer)) {
            this.layers.set(layer, new Set<GraphicsElement<any>>())
        }
        this.layers.get(layer).add(childElement)
    }
}
