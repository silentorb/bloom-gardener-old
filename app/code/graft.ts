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
}