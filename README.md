```javascript
var group = require('commonform-group-series')
var assert = require('assert')

var A = { form: { content: [ 'A' ] } }
var B = { form: { content: [ 'B' ] } }
var C = { form: { content: [ 'C' ] } }
var D = { form: { content: [ 'D' ] } }

var X = { use: 'X' }
var Y = { definition: 'Y' }

var form = { content: [ A, B, X, 'text', Y, C, D ] }

assert.deepEqual(
  group(form),
  [ { type: 'series',
      content: [ A, B ] },
    { type: 'paragraph',
      content: [ X, 'text', Y ] },
    { type: 'series',
      content: [ C, D ] } ])
```
