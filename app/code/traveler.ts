module Traveler {

  export interface Output<T> {
    get_value():T
    targets:Input<T>[]
  }

  export interface Input<T> {
    set_value:{(value:T):void}
    source:Output<T>
  }

  export function changed<T>(output:Output<T>, value:T) {
    if (!output.targets)
      return

    for (var i = 0; i < output.targets.length; ++i) {
      output.targets[i].set_value(value)
    }
  }

  export function connect<T>(output:Output<T>, input:Input<T>) {
    if (input.source == output)
      return

    if (!output.targets)
      output.targets = []

    input.source = output
    output.targets.push(input)

    input.set_value(output.get_value())
  }

  export function sequence(list) {
    for (var i = 0; i < list.length - 1; ++i) {
      Traveler.connect(list[i], list[i + 1])
    }
  }

  export class Map<I, O> implements Input<I>, Output<O> {
    mapper
    source
    targets

    constructor(mapper) {
      this.mapper = mapper
    }

    set_value(value) {
      Traveler.changed(this, this.mapper(value))
    }

    get_value() {
      var value = this.source ? this.source.get_value() : null
      return this.mapper(value)
    }

  }

  export class List_Map<I, O> implements Input<I[]>, Output<O[]> {
    mapper
    source
    targets

    constructor(mapper) {
      this.mapper = mapper
    }

    set_value(value) {
      Traveler.changed(this, this.map(value))
    }

    get_value() {
      var value = this.source ? this.source.get_value() : null
      return this.map(value)
    }

    private map(value) {
      if (!value)
        return []

      return value.map(this.mapper)
    }
  }

  export class Variable<T> implements Output<T> {
    value:T
    targets

    constructor(value) {
      this.value = value
    }

    get_value() {
      return this.value
    }

    set_value(value) {
      if (this.value === value)
        return

      this.value = value
      Traveler.changed(this, value)
    }
  }
}