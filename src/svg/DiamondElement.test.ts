import {Direction, Point, point} from '../core/Common'
import {diamondEq} from '../test-utilities/units'
import {DiamondElement} from './DiamondElement'
import {Diamond} from '../core/Primitives'

function diamond(t,r,b,l: Point): Diamond {
    return {
        getTop: () => t,
        getBottom: () => b,
        getLeft: () => l,
        getRight: () => r
    }
}

it('should create simple diamond shape', () => {
    // Given
    const d = new DiamondElement(point(10,20), Direction.top, 50)

    // When
    const element = d.create()

    // Then
    expect(diamondEq(d, diamond(point(10,20), point(60, 70), point(10,120), point(-40,70)))).toBe(true)
    expect(element.getAttribute('d')).toBe('M10 20 L60 70 L10 120 L-40 70 Z')
    expect(element.getAttribute('stroke')).toBe('black')
    expect(element.getAttribute('fill')).toBe('black')
})
