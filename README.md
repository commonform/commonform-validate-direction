```javascript
var assert = require('assert')
var valid = require('commonform-validate-direction')

assert(valid({
  blank: ['content', 0],
  value: 'some string'
}))

assert(valid({
  blank: [
    'content', 0,
    'form', 'content', 1,
    'form', 'content', 2
  ],
  value: 'some string'
}))

assert(!valid({
  // Identifies a form, not a blank.
  blank: [
    'content', 0,
    'form', 'content', 1,
    'form'
  ],
  value: 'some string'
}))

assert(!valid({
  // Form as first array element
  blank: ['form', 'content', 0],
  value: 'some string'
}))

assert(!valid({
  // Empty key array
  blank: [],
  value: 'some string'
}))

assert(!valid({
  blank: ['form', 'content'],
  value: 'some string'
}))

assert(!valid({}))

assert(!valid('strings are not directions'))
```
