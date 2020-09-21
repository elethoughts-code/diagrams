import {Diagram} from "../../../src/svg/Diagram";
import {CircleElement} from "../../../src/svg/CircleElement";
import {Direction, point} from "../../../src/core/Common";
import {RectElement} from "../../../src/svg/RectElement";
import {ArrowMarker} from "../../../src/svg/ArrowMarker";
import {PathElement} from "../../../src/svg/PathElement";
import {DiamondElement} from "../../../src/svg/DiamondElement";

export const group = 'Inline diagram creation'


export function should_create_empty_diagram(): Element {

    const diagram = new Diagram(600, 600).create()
    diagram.style.border = '1px solid gray'
    return diagram
}

export function should_create_a_simple_diagram(): Element {

    const diagram = new Diagram(600, 600)

    const start = new CircleElement(point(300,30), 15)
    const step1 = new RectElement(point(300-50, 80), 100, 50)
    const marker = new ArrowMarker()
    const path1 = new PathElement([point(300,25), point(300,80)], null, 'arrow-marker')

    diagram.addChild(start)
    diagram.addChild(step1)
    diagram.addChild(path1)
    diagram.addMaker('arrow-marker', marker)

    const diamond = new DiamondElement(point(300, 150), Direction.top, 15)
    const path2 = new PathElement([point(300,130), point(300,150)], null, 'arrow-marker')
    diagram.addChild(diamond)
    diagram.addChild(path2)

    const step3 = new RectElement(point(300-150, 220), 100, 50)
    const step4 = new RectElement(point(300+50, 220), 100, 50)
    const path3 = new PathElement([point(300,180), point(300-100,220)], null, 'arrow-marker')
    const path4 = new PathElement([point(300,180), point(300+100,220)], null, 'arrow-marker')

    diagram.addChild(step3)
    diagram.addChild(step4)
    diagram.addChild(path3)
    diagram.addChild(path4)

    return diagram.create()
}
