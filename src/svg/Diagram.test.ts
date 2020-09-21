import {Diagram} from './Diagram'
import {RectElement} from './RectElement'
import {Direction, point} from '../core/Common'
import {DiamondElement} from './DiamondElement'
import {PathElement} from './PathElement'
import {ArrowMarker} from './ArrowMarker'

it('should create an empty diagram element', () => {
    // Given
    const diagram = new Diagram(300,150)

    // When
    const element = diagram.create()

    // Then
    expect(element.getAttribute('width')).toBe('300')
    expect(element.getAttribute('height')).toBe('150')
    expect(element.getAttribute('viewBox')).toBe('0 0 300 150')


    expect(element.children).toHaveLength(0)
})

it('should create an empty diagram element with markers', () => {
    // Given
    const diagram = new Diagram(300,150)

    // When
    diagram.addMaker('marker-1', new ArrowMarker())
    diagram.addMaker('marker-2', new ArrowMarker())
    const element = diagram.create()

    // Then
    expect(element.getAttribute('width')).toBe('300')
    expect(element.getAttribute('height')).toBe('150')
    expect(element.getAttribute('viewBox')).toBe('0 0 300 150')


    expect(element.children).toHaveLength(1)
    expect(element.children[0].tagName).toBe('defs')
    expect(element.children[0].children).toHaveLength(2)
    expect(element.children[0].children[0].getAttribute('id')).toBe('marker-1')
    expect(element.children[0].children[1].getAttribute('id')).toBe('marker-2')
})

it('should create a single element diagram', () => {
    // Given
    const diagram = new Diagram(300,150)

    // When
    diagram.addChild(new RectElement(point(10,10), 60, 30))

    const element = diagram.create()

    // Then
    expect(element.getAttribute('width')).toBe('300')
    expect(element.getAttribute('height')).toBe('150')
    expect(element.getAttribute('viewBox')).toBe('0 0 300 150')


    expect(element.children).toHaveLength(1)
    expect(element.children[0].tagName).toBe('g')

    expect(element.children[0].children).toHaveLength(1)
    expect(element.children[0].children[0].tagName).toBe('rect')
})

it('should create multi elements diagram', () => {
    // Given
    const diagram = new Diagram(300,150)

    // When
    diagram.addChild(new RectElement(point(10,10), 60, 30))
    diagram.addChild(new DiamondElement(point(100,100), Direction.top, 30))
    diagram.addChild(new PathElement([point(10,10), point(100,100)]))

    const element = diagram.create()

    // Then
    expect(element.getAttribute('width')).toBe('300')
    expect(element.getAttribute('height')).toBe('150')
    expect(element.getAttribute('viewBox')).toBe('0 0 300 150')


    expect(element.children).toHaveLength(1)
    expect(element.children[0].tagName).toBe('g')

    expect(element.children[0].children).toHaveLength(3)
    expect(element.children[0].children[0].tagName).toBe('rect')
    expect(element.children[0].children[1].tagName).toBe('path')
    expect(element.children[0].children[2].tagName).toBe('path')
})

it('should create multi elements and layers diagram', () => {
    // Given
    const diagram = new Diagram(300,150)

    // When
    diagram.addChild(new RectElement(point(10,10), 60, 30))
    diagram.addChild(new DiamondElement(point(100,100), Direction.top, 30))
    diagram.addChild(new PathElement([point(10,10), point(100,100)]))

    diagram.addChild(new RectElement(point(10,10), 60, 30),1)
    diagram.addChild(new DiamondElement(point(100,100), Direction.top, 30),1)

    diagram.addChild(new RectElement(point(10,10), 60, 30),2)

    const element = diagram.create()

    // Then
    expect(element.getAttribute('width')).toBe('300')
    expect(element.getAttribute('height')).toBe('150')
    expect(element.getAttribute('viewBox')).toBe('0 0 300 150')


    expect(element.children).toHaveLength(3)
    expect(element.children[0].tagName).toBe('g')
    expect(element.children[1].tagName).toBe('g')
    expect(element.children[2].tagName).toBe('g')

    expect(element.children[0].children).toHaveLength(3)
    expect(element.children[0].children[0].tagName).toBe('rect')
    expect(element.children[0].children[1].tagName).toBe('path')
    expect(element.children[0].children[2].tagName).toBe('path')

    expect(element.children[1].children).toHaveLength(2)
    expect(element.children[1].children[0].tagName).toBe('rect')
    expect(element.children[1].children[1].tagName).toBe('path')

    expect(element.children[2].children).toHaveLength(1)
    expect(element.children[2].children[0].tagName).toBe('rect')
})
