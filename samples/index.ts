import 'normalize.css'
import {SampleEngine} from './tooling/Samples'
import {ready} from './tooling/ready'
import {Viewer} from './tooling/Viewer'

import * as pathElements from './src/elements/BasicElements'
import * as diagramElements from './src/elements/Diagram'

const engine = new SampleEngine()

function init(importObject: { group: string}): void {
    for(const [key, value] of Object.entries(importObject)) {
        if (typeof value === 'function') {
            engine.register(importObject.group, key, value)
        }
    }
}

init(pathElements)
init(diagramElements)

ready(document)
    .then( () => new Viewer(engine, document.getElementById('wrapper'), document))
