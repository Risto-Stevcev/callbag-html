const { div, span } = require('.')
const { pipe, map, interval } = require('callbag-basics')

const clock =
  pipe(
    interval(1000),
    map(() => span(`The time is ${new Date().toString()}`))
  )

document.body.appendChild(
  div([
    clock
  ])
)
