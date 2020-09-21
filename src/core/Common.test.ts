import {Direction, norm, opposite, point, vector} from './Common'

it('opposite function should calculate opposite directions', () => {
    expect(opposite(Direction.top)).toBe(Direction.bottom)
    expect(opposite(Direction.bottom)).toBe(Direction.top)
    expect(opposite(Direction.left)).toBe(Direction.right)
    expect(opposite(Direction.right)).toBe(Direction.left)
})

it('vector function should calculate vector from points', () => {
    // Given
    const p1 = point(5,4)
    const p2 = point(9,2)

    // When
    const v = vector(p1, p2)

    // Then
    expect(v.getX()).toBe(4)
    expect(v.getY()).toBe(-2)
})

it('norm function should calculate the norm of a vector', () => {
    // Given
    const v = point(5,4)

    // When
    const n = norm(v)

    // Then
    expect(n).toBe(Math.sqrt(41))
})
