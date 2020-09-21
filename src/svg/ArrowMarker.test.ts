import {ArrowMarker} from './ArrowMarker'

it('should create simple arrow marker', () => {
    // Given
    const arrowMarker = new ArrowMarker()

    // When
    const element = arrowMarker.create()

    // Then
    expect(element.getAttribute('markerWidth')).toBe('5')
    expect(element.getAttribute('markerHeight')).toBe('10')
    expect(element.getAttribute('refX')).toBe('5')
    expect(element.getAttribute('refY')).toBe('5')
    expect(element.getAttribute('orient')).toBe('auto')

    expect(element.children).toHaveLength(1)

    expect(element.children[0].getAttribute('d')).toBe('M0,0 l0,10 l5,-5 z')
    expect(element.children[0].getAttribute('fill')).toBe('black')
})
