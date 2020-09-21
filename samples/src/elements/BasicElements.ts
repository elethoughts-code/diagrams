import {PathElement} from '../../../src/svg/PathElement'
import {Direction, point} from '../../../src/core/Common'
import {SVG_NS} from '../../../src/svg/Definitons'
import {ArrowMarker} from '../../../src/svg/ArrowMarker'
import {RectElement} from '../../../src/svg/RectElement'
import {HtmlForeignElement} from '../../../src/svg/HtmlForeignElement'
import {DiamondElement} from '../../../src/svg/DiamondElement'
import {CircleElement} from "../../../src/svg/CircleElement";

export const group = 'Simple SVG Elements'

export function should_make_path_based_shapes(): Element {
    const svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttribute('width', '300')
    svg.setAttribute('height', '300')
    svg.setAttribute('viewBox', `0 0 300 300`)

    // Two point paths
    const p1 = new PathElement( [point(10,10), point(100,100)] ).create()
    const p2 = new PathElement( [point(10,10), point(10,100)] ).create()
    const p3 = new PathElement( [point(10,10), point(30,100)] ).create()
    const p4 = new PathElement( [point(10,10), point(100,10)] ).create()

    svg.appendChild(p1)
    svg.appendChild(p2)
    svg.appendChild(p3)
    svg.appendChild(p4)

    // Multi point paths
    const p5 = new PathElement( [point(10,10), point(100,100), point(300,100), point(300,300)] ).create()
    svg.appendChild(p5)

    // Multi point paths with marker
    const defElement = document.createElementNS(SVG_NS, 'defs')
    svg.appendChild(defElement)

    const arrowMarker = new ArrowMarker().create()
    arrowMarker.setAttribute('id', 'arrow-marker')
    defElement.appendChild(arrowMarker)
    const p6 = new PathElement( [point(10,10), point(100,100), point(250,100), point(250,300)], null, 'arrow-marker')
        .create()
    svg.appendChild(p6)

    return svg
}

export function should_make_rectangular_shapes(): Element {
    const svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttribute('width', '300')
    svg.setAttribute('height', '300')
    svg.setAttribute('viewBox', `0 0 300 300`)

    // Simple rectangular shapes
    const r1 = new RectElement(point(10,10), 50, 25)
    const r2 = new RectElement(point(10,65), 30, 30, 'black', 'red')


    svg.appendChild(r1.create())
    svg.appendChild(r2.create())

    // Html rectangular shapes
    const div = document.createElement('div')

    const shadow = div.attachShadow({ mode: 'closed'})
    shadow.innerHTML = `
          <style>
            h3, p {
                margin: 0;
                padding: 0;
            }
          </style>
          <h3>This is a header</h3>
          <p>This is some content</p>
        `

    const h1 = new HtmlForeignElement(point(10,100), 200, 50, div)

    const h1Element = h1.create()
    h1Element.style.border = '1px solid gray'

    svg.appendChild(h1Element)
    return svg
}

export function should_make_diamond_and_circle_shapes(): Element {
    const svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttribute('width', '300')
    svg.setAttribute('height', '300')
    svg.setAttribute('viewBox', `0 0 300 300`)

    // Simple rectangular shapes
    const r1 = new DiamondElement(point(60,10), Direction.top, 50)
    const r2 =  new DiamondElement(point(80,100), Direction.top, 30, 'orange', 'none')
    const c1 = new CircleElement(point(190,150), 15)
    const c2 = new CircleElement(point(190,150), 20, 'orange', 'none')

    svg.appendChild(r1.create())
    svg.appendChild(r2.create())
    svg.appendChild(c1.create())
    svg.appendChild(c2.create())

    return svg
}
