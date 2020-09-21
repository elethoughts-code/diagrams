import {PathElement} from './PathElement'
import {point} from '../core/Common'
import {pathEq} from '../test-utilities/units'

it('should create two point path element', () => {
    // Given
    const path = new PathElement([point(5,3), point(15,23)])

    // When

    const element = path.create()

    expect(element.getAttribute('d')).toBe('M5 3 L15 23')
    expect(element.getAttribute('stroke')).toBe('black')

    expect(pathEq(path.getPath(), [point(5,3), point(15,23)])).toBe(true)
})

it('should create multi points path element', () => {
    // Given
    const path = new PathElement([point(5,3), point(15,23), point(-10, 60), point(0,0)])

    // When

    const element = path.create()

    expect(element.getAttribute('d')).toBe('M5 3 L15 23 L-10 60 L0 0')
    expect(element.getAttribute('stroke')).toBe('black')
})

it('should create multi points path elements with markers', () => {
    // Given
    const path1 = new PathElement([point(5,3), point(15,23)], 'arrow-marker')
    const path2 = new PathElement([point(5,3), point(15,23), point(-10, 60), point(0,0)], null, 'arrow-marker')
    const path3 = new PathElement([point(5,3), point(15,23), point(-10, 60), point(0,0)], null, null, 'arrow-marker')
    const path4 = new PathElement([ point(5,3), point(15,23), point(-10, 60), point(0,0)],
                                    'arrow-marker', 'arrow-marker', 'arrow-marker')

    // When
    const element1 = path1.create()
    const element2 = path2.create()
    const element3 = path3.create()
    const element4 = path4.create()

    expect(element1.getAttribute('marker-start')).toBe('url(#arrow-marker)')
    expect(element2.getAttribute('marker-end')).toBe('url(#arrow-marker)')
    expect(element3.getAttribute('marker-mid')).toBe('url(#arrow-marker)')

    expect(element4.getAttribute('marker-start')).toBe('url(#arrow-marker)')
    expect(element4.getAttribute('marker-mid')).toBe('url(#arrow-marker)')
    expect(element4.getAttribute('marker-end')).toBe('url(#arrow-marker)')
})
