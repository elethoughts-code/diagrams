import {point} from '../core/Common'
import {HtmlForeignElement} from './HtmlForeignElement'
import {pointEq} from '../test-utilities/units'

it('should create simple foreign element', () => {
    // Given
    const div = document.createElement('div')
    div.innerHTML = '<h3>Hello world!</h3> I am a div'
    const fe = new HtmlForeignElement(point(10,15), 100, 50, div)

    // When
    const element = fe.create()

    // Then
    expect(pointEq(fe.getOrigin(), point(10,15))).toBe(true)
    expect(fe.getWidth()).toBe(100)
    expect(fe.getHeight()).toBe(50)

    expect(element.getAttribute('x')).toBe('10')
    expect(element.getAttribute('y')).toBe('15')
    expect(element.getAttribute('width')).toBe('100')
    expect(element.getAttribute('height')).toBe('50')

    expect(element.children).toHaveLength(1)
    expect(element.children[0].outerHTML).toBe('<div><h3>Hello world!</h3> I am a div</div>')
})
