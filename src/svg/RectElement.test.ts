import {point} from '../core/Common'
import {RectElement} from './RectElement'
import {pointEq} from '../test-utilities/units'

it('should create simple rectangular shape', () => {
    // Given
    const rect = new RectElement(point(10,15), 100, 50)

    // When
    const element = rect.create()

    // Then
    expect(element.getAttribute('x')).toBe('10')
    expect(element.getAttribute('y')).toBe('15')
    expect(element.getAttribute('stroke')).toBe('black')
    expect(element.getAttribute('fill')).toBe('none')

    expect(pointEq(rect.getOrigin(), point(10,15))).toBe(true)
    expect(rect.getWidth()).toBe(100)
    expect(rect.getHeight()).toBe(50)
})
