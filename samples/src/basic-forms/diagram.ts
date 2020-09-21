import {DiagramBuilder} from '../../../src/builder/DiagramBuilder'
import {Diagram} from '../../../src/svg/Diagram'
import {HtmlForeignElement} from '../../../src/svg/HtmlForeignElement'
import {point} from '../../../src/core/Common'
import {RectElement} from '../../../src/svg/RectElement'

export const group = 'diagram samples (1)'

export function should_do_something(): Element {
    const div = document.createElement('div')
    for(let i = 0; i < 100; i++)
        div.innerHTML += `A[${i}]<br/>`
    return div
}

export function should_do_something_else(): Element {
    const diagramBuilder = new DiagramBuilder(new Diagram(600, 600))
    const div = document.createElement('div')
    div.innerHTML = '<b>Ok this is some </b> HTML Content HTML Content HTML Content HTML Content '

    diagramBuilder.rect(new HtmlForeignElement(point(0,0), 150, 75, div))
        .right()
        .horizontal(200)
        .rect(new RectElement(null, 150, 75))

    return diagramBuilder.d.create()
}
