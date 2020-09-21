type Sample = () => Element

export class SampleGroup {

    samples: Map<string, Sample>

    constructor() {
        this.samples = new Map<string, Sample>()
    }

    register(description: string, sample: Sample) {
        if (this.samples.has(description)) {
            throw new Error(`description : "${description}" already registered`)
        }
        this.samples.set(description, sample)
    }

    get(description: string): Sample {
        return this.samples.get(description)
    }

    has(description: string): boolean {
        return this.samples.has(description)
    }

    keys(): IterableIterator<string> {
        return this.samples.keys()
    }
}

export class SampleEngine {

    private readonly groups: Map<string, SampleGroup>

    private currentGroup: string

    private currentSample: string

    constructor() {
        this.groups = new Map<string, SampleGroup>()
        this.currentGroup = null
        this.currentSample = null
    }

    register(group: string, description: string, sample: Sample) {
        if (!this.groups.has(group)) {
            this.groups.set(group, new SampleGroup())
        }
        this.groups.get(group).register(description, sample)
    }

    load(config: {group: string, sample: string}): {group: string, description: string, element: Element}  {

        this.currentSample = config.sample
        this.currentGroup = config.group

        return this.draw()
    }

    getCurrent(): {group: string, sample: string} {
        return {
            group: this.currentGroup,
            sample: this.currentSample
        }
    }

    draw(): {group: string, description: string, element: Element} {
        if (!this.currentGroup || !this.groups.has(this.currentGroup)) {
            this.currentGroup = this.groups.keys().next().value
            this.currentSample = this.groups.get(this.currentGroup).keys().next().value
        }
        const group = this.groups.get(this.currentGroup)

        if(!this.currentSample || !group.has(this.currentSample)) {
            this.currentSample = group.keys().next().value
        }

        if (!group) {
            throw new Error(`cannot find group "${this.currentGroup}"`)
        }
        const sample = group.get(this.currentSample)
        if (!sample) {
            throw new Error(`cannot find sample "${this.currentSample}" into group "${this.currentGroup}"`)
        }
        return {
            group: this.currentGroup,
            description: this.currentSample,
            element: sample()
        }
    }

    next(): void {
        if (this.groups === null || this.groups.size < 1) {
            return
        }
        const groupKeys = new Array(...this.groups.keys())

        if (this.currentGroup === null) {
            this.currentGroup = groupKeys[0]
        }

        const sampleKeys = new Array(...this.groups.get(this.currentGroup).keys())

        if (this.currentSample === null) {
            this.currentSample = sampleKeys[0]
            return
        }

        if (sampleKeys.length === sampleKeys.indexOf(this.currentSample) + 1
            && groupKeys.length === groupKeys.indexOf(this.currentGroup) + 1) {
            // End of navigation
            return
        }else if (sampleKeys.length === sampleKeys.indexOf(this.currentSample) + 1) {
            // Move forward group
            this.currentGroup = groupKeys[groupKeys.indexOf(this.currentGroup) + 1]
            const sk = new Array(...this.groups.get(this.currentGroup).keys())
            this.currentSample = sk[0]
        }else {
            // Move forward sample
            this.currentSample = sampleKeys[sampleKeys.indexOf(this.currentSample) + 1]
        }
    }

    prev(): void {
        if (this.groups === null || this.groups.size < 1) {
            return
        }
        const groupKeys = new Array(...this.groups.keys())

        if (this.currentGroup === null) {
            this.currentGroup = groupKeys[groupKeys.length - 1]
        }

        const sampleKeys = new Array(...this.groups.get(this.currentGroup).keys())

        if (this.currentSample === null) {
            this.currentSample = sampleKeys[sampleKeys.length - 1]
            return
        }

        if(sampleKeys.indexOf(this.currentSample) === 0 &&  groupKeys.indexOf(this.currentGroup) === 0) {
            // End of navigation
            return
        }else if (sampleKeys.indexOf(this.currentSample) === 0) {
            // Move backward group
            this.currentGroup = groupKeys[groupKeys.indexOf(this.currentGroup) - 1]
            const sk = new Array(...this.groups.get(this.currentGroup).keys())
            this.currentSample = sk[sk.length -1]
        }else {
            // Move backward sample
            this.currentSample = sampleKeys[sampleKeys.indexOf(this.currentSample) - 1]
        }
    }
}
