# callbag-html

An html markup library for callbag


## Example

```js
const { div, span, br } = require('callbag-html')
const { pipe, map, interval } = require('callbag-basics')

// A callbag stream of an HTMLElement
const clock =
  pipe(
    interval(1000),
    map(() => span(`The time is ${new Date().toString()}`))
  )

document.body.appendChild(
  div([
    span('The time is:'), // Can accept ordinary markup
    br(), // Variadic functions for clean looking markup
    clock // Accepts callbag streams of elements!!
  ])
)
```

## API

The API is very similar to [r-dom](https://github.com/uber/r-dom)'s, except that 
it can accept callbag streams for seamless interop and it returns real `HTMLElement`s

This doc assumes the library was imported as `const h = require('callbag-html')`. The function is variadic:

#### `h[tagName]([innerText])`

Returns an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

- **tagName** `String` - An HTMLElement tag name
- **innerText** `String` - The innerText of the element


#### `h[tagName]([children])`

Returns an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

- **tagName** `String` - An HTMLElement tag name
- **children** `Array[HTMLElement|Stream[HTMLElement]]` - An array where each element can be an 
  HTMLElement or a callbag stream of an HTMLElement


#### `h[tagName]([children$])`

Returns an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

- **tagName** `String` - An HTMLElement tag name
- **children$** `Stream[Array[HTMLElement|Stream[HTMLElement]]]` - A callbag stream of an array where each element can be an 
  HTMLElement or a callbag stream of an HTMLElement


#### `h[tagName]([properties], [innerText])`

Returns an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

- **tagName** `String` - An HTMLElement tag name
- **properties** `Object` - An object with property/value pairs
- **innerText** `String` - The innerText of the element


#### `h[tagName]([properties], [children])`

Returns an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

- **tagName** `String` - An HTMLElement tag name
- **properties** `Object` - An object with property/value pairs
- **children** `Array[HTMLElement|Stream[HTMLElement]]` - An array where each element can be an 
  HTMLElement or a callbag stream of an HTMLElement


#### `h[tagName]([properties], [children$])`

Returns an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

- **tagName** `String` - An HTMLElement tag name
- **properties** `Object` - An object with property/value pairs
- **children$** `Stream[Array[HTMLElement|Stream[HTMLElement]]]` - A callbag stream of an array where each element can be an 
  HTMLElement or a callbag stream of an HTMLElement


### Argument Examples

- **properties**
  - `{ id: 'foo', style: { fontSize: '12px' }, className: 'bar', classSet: { toggled: true } }`

- **children**
  - `[span('foo'), span('bar'), span('baz')]`
  - `[pipe(interval(1000), map(n => span(n))), span('!')]`
  - `pipe(interval(500), map(n => [span('N = '), strong(n)]))`


## Tests

Run `npm run watch` to generate the test bundle, served by default on `localhost:1234`


## License

See LICENSE
