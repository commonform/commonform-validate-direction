/*
Copyright 2016 Kyle E. Mitchell

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

module.exports = function (argument) {
  if (typeof argument !== 'object') {
    return false
  }
  var blank = argument.blank
  var value = argument.value
  return (
    // Blank key array
    argument.hasOwnProperty('blank') &&
    Array.isArray(blank) &&
    validKeyArray(blank) &&
    (
      blank.length === 2 ||
      blank.length % 3 === 2
    ) &&
    // Value string
    argument.hasOwnProperty('value') &&
    typeof value === 'string'
  )
}

function validKeyArray (array) {
  if (array.length === 0) {
    return false
  }
  return array.every(function (element, index) {
    if (index === 0) {
      return element === 'content'
    } else {
      // After the initial
      //
      //     ['content', INDEX,...]
      //
      // only groups of
      //
      //     [...'form', 'content', INDEX,...]
      //
      // are valid.
      var remainder = index % 3
      if (remainder === 1) {
        return isArrayIndex(element)
      } else if (remainder === 2) {
        return element === 'form'
      } else /* if (remainder === 3) */ {
        return element === 'content'
      }
    }
  })
}

function isArrayIndex (argument) {
  return (
    Number.isInteger(argument) &&
    argument >= 0
  )
}
