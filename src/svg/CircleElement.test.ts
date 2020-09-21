import {point} from '../core/Common'
import {pointEq} from '../test-utilities/units'
import {CircleElement} from './CircleElement'

it('should create simple circle shape', () => {
    // Given
    const circle = new CircleElement(point(10,15), 30)

    // When
    const element = circle.create()

    // Then
    expect(element.getAttribute('cx')).toBe('10')
    expect(element.getAttribute('cy')).toBe('15')
    expect(element.getAttribute('r')).toBe('30')
    expect(element.getAttribute('stroke')).toBe('black')
    expect(element.getAttribute('fill')).toBe('black')

    expect(pointEq(circle.getCenter(), point(10,15))).toBe(true)
    expect(circle.getRadius()).toBe(30)
})
