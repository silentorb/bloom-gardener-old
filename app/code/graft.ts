module Graft {

  export function bind_list_to_element(target, source, mapper) {
    copy_list_to_element(target, source, mapper)
  }

  function copy_list_to_element(target, source, mapper) {
    target.innerHTML = ''
    for (var key in source) {
      var addition = mapper(source[key], key)
      target.appendChild(addition)
    }
  }

  export function bind_to_element(target, source, mapper) {
    var old_value = source
    target = replace_element(target, source, mapper)

    return function (new_value) {
      if (new_value == old_value)
        return

      target = replace_element(target, new_value, mapper)
    }
  }

  function replace_element(target, source, mapper) {
    var new_item = source
    if (!new_item) {
      new_item = document.createElement('div')
      mapper = null
    }
    else if (mapper) {
      new_item = mapper(source)
    }

    target.parentNode.replaceChild(new_item, target)

    return new_item
  }

  export function sort(key) {
    return function (a, b) {
      if (a[key] == b[key])
        return 0

      return a[key] < b[key] ? -1 : 1
    }
  }

  export class Event {
    listeners = []
    one_time = []
    was_invoked = false
    last_args:any[] = null

    add(listener, callback) {
      this.listeners.push({
        listener: listener,
        callback: callback
      })
    }

    once(listener, callback) {
      if (this.was_invoked) {
        callback.apply(listener, this.last_args)
      }
      else {
        this.one_time.push({
          listener: listener,
          callback: callback
        })
      }
    }

    invoke() {
      var args = this.last_args = Array.prototype.slice.call(arguments)

      for (var i = 0; i < this.listeners.length; ++i) {
        var item = this.listeners[i]
        item.callback.apply(item.listener, args)
      }

      for (var i = 0; i < this.one_time.length; ++i) {
        var item = this.one_time[i]
        item.callback.apply(item.listener, args)
      }

      this.one_time = []
      this.was_invoked = true
    }
  }
}