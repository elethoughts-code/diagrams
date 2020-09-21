import {SampleEngine} from './Samples'

export class Viewer {

    private readonly dElement: HTMLElement
    private readonly descElement: HTMLElement
    private readonly groupElement: HTMLElement
    private readonly dElementShadow: ShadowRoot

    constructor(private engine: SampleEngine, private wrapper: HTMLElement, private document: Document) {
        this.groupElement = document.getElementById('group')
        this.descElement = document.getElementById('desc')
        this.dElement = document.getElementById('draw')

        this.dElementShadow = this.dElement.attachShadow({ mode: 'closed'})
        const saved = localStorage.getItem('current')

        if(saved) {
            const current  = this.engine.load(JSON.parse(saved))
            this.print(current.group, current.description, current.element)
        }else {
            this.next()
        }
        document.addEventListener('keydown', e => {
            switch(e.code) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    this.prev()
                    e.preventDefault()
                    break
                case 'ArrowRight':
                case 'ArrowUp':
                    this.next()
                    e.preventDefault()
                    break
            }
        })
    }

    private print(group: string, description: string, element: Element) {
        this.groupElement.innerHTML = group
        this.descElement.innerHTML = description.replace(/_/g,' ')
        this.dElementShadow.innerHTML = '<style></style>'
        this.dElementShadow.appendChild(element)
    }

    next() {
        this.engine.next()
        const current = this.engine.draw()
        this.print(current.group, current.description, current.element)
        localStorage.setItem('current', JSON.stringify(this.engine.getCurrent()))
    }

    prev() {
        this.engine.prev()
        const current = this.engine.draw()
        this.print(current.group, current.description, current.element)
        localStorage.setItem('current', JSON.stringify(this.engine.getCurrent()))
    }

}
