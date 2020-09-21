
export const SVG_NS = 'http://www.w3.org/2000/svg'

export interface GraphicsElement<T extends SVGGraphicsElement> {

    create(): T
}

export interface MarkerElement {

    create(): SVGMarkerElement
}
