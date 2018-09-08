const { forEach } = require('callbag-basics')
const morphdom = require('morphdom')

const isCallbag    = x => typeof x === 'function'
    , isNode       = x => x instanceof Node

const isAttributes = x => !(x instanceof Array) && x instanceof Object  
    , isChildren   = x => x instanceof Array && x.every(item => isNode(item) || isCallbag(item))
    , isText       = x => typeof x === 'string'
    , isNone       = x => x === undefined

const getArgs = (arg1, arg2) =>
  isNone(arg1) && isNone(arg2) ?
  { attributes: {}, children: [] } :
  isChildren(arg1) && isNone(arg2) ?
  { attributes: {}, children: arg1 } :
  isAttributes(arg1) && isNone(arg2) ?
  { attributes: arg1, children: [] } :
  isText(arg1) && isNone(arg2) ?
  { attributes: {}, children: [document.createTextNode(arg1)] } :
  isAttributes(arg1) && isText(arg2) ?
  { attributes: arg1, children: [document.createTextNode(arg2)] } :
  isAttributes(arg1) && isChildren(arg2) ?
  { attributes: arg1, children: arg2 } :
  isCallbag(arg1) && isNone(arg2) ?
  { attributes: arg1, children: [] } :
  isNone(arg1) && isCallbag(arg2) ?
  { attributes: {}, children: arg2 } :
  isCallbag(arg1) && isCallbag(arg2) ?
  { attributes: arg1, children: arg2 } : null

const setAttribute = (element, key) => value => {
  switch (key) {
    case 'id': element.id = value ;break
    case 'className': element.className = value ;break
    case 'classSet':
      element.className += ' ' + Object.entries(value)
        .reduce(([className, isIncluded]) => isIncluded ? className : '')
        .join(' ') ;break
    case 'style':
      Object.entries(value).forEach(([property, value]) => {
        element.style[property] = value
      }) ;break
    default:
      element[key] = value
  }
}

const setAttributes = element => attributes => {
  for (const [key, value] of Object.entries(attributes)) {
    setAttribute(element, key)(value)
  }
}

const removeChildren = element => {
  while (element.firstChild) element.removeChild(element.firstChild)
}

const setChildren = element => children => {
  removeChildren(element)

  children.forEach((_child, index) => {
    var { child, child$ } = {
      child:  isNode(_child)    ? _child :
              isText(_child)    ? document.createTextNode(_child) : null,
      child$: isCallbag(_child) ? _child : null
    }

    if (child)
      element.appendChild(child)

    if (child$)
      forEach(newChild => {
        if (!child) {
          child = newChild
          element.insertBefore(child, element.children[index] || null)
        }
        morphdom(child, newChild)
      })(child$)
  })
}

const setElement = (element, { attributes, children }) => {
  setAttributes(element)(attributes)

  if (isCallbag(children))
    forEach(setChildren(element))(children)
  else
    setChildren(element)(children)

  return element
}

const _element = tagName => (arg1, arg2) => {
  const args = getArgs(arg1, arg2)
  if (args === null) throw new Error('Invalid arguments passed to ddom')
  return setElement(document.createElement(tagName), args)
}

module.exports = {
  a: _element('a'),
  abbr: _element('abbr'),
  acronym: _element('acronym'),
  address: _element('address'),
  applet: _element('applet'),
  area: _element('area'),
  article: _element('article'),
  aside: _element('aside'),
  audio: _element('audio'),
  b: _element('b'),
  base: _element('base'),
  basefont: _element('basefont'),
  bdo: _element('bdo'),
  bgsound: _element('bgsound'),
  big: _element('big'),
  blink: _element('blink'),
  blockquote: _element('blockquote'),
  body: _element('body'),
  br: _element('br'),
  button: _element('button'),
  canvas: _element('canvas'),
  caption: _element('caption'),
  center: _element('center'),
  cite: _element('cite'),
  code: _element('code'),
  col: _element('col'),
  colgroup: _element('colgroup'),
  command: _element('command'),
  datalist: _element('datalist'),
  dd: _element('dd'),
  del: _element('del'),
  details: _element('details'),
  dfn: _element('dfn'),
  div: _element('div'),
  dl: _element('dl'),
  dt: _element('dt'),
  em: _element('em'),
  embed: _element('embed'),
  fieldset: _element('fieldset'),
  figcaption: _element('figcaption'),
  figure: _element('figure'),
  font: _element('font'),
  footer: _element('footer'),
  form: _element('form'),
  frame: _element('frame'),
  frameset: _element('frameset'),
  h1: _element('h1'),
  h2: _element('h2'),
  h3: _element('h3'),
  h4: _element('h4'),
  h5: _element('h5'),
  h6: _element('h6'),
  head: _element('head'),
  header: _element('header'),
  hgroup: _element('hgroup'),
  hr: _element('hr'),
  html: _element('html'),
  i: _element('i'),
  iframe: _element('iframe'),
  img: _element('img'),
  input: _element('input'),
  ins: _element('ins'),
  isindex: _element('isindex'),
  kbd: _element('kbd'),
  keygen: _element('keygen'),
  label: _element('label'),
  legend: _element('legend'),
  li: _element('li'),
  link: _element('link'),
  listing: _element('listing'),
  map: _element('map'),
  mark: _element('mark'),
  marquee: _element('marquee'),
  math: _element('math'),
  menu: _element('menu'),
  meta: _element('meta'),
  meter: _element('meter'),
  nav: _element('nav'),
  nextid: _element('nextid'),
  nobr: _element('nobr'),
  noembed: _element('noembed'),
  noframes: _element('noframes'),
  noscript: _element('noscript'),
  object: _element('object'),
  ol: _element('ol'),
  optgroup: _element('optgroup'),
  option: _element('option'),
  output: _element('output'),
  p: _element('p'),
  param: _element('param'),
  plaintext: _element('plaintext'),
  pre: _element('pre'),
  progress: _element('progress'),
  q: _element('q'),
  rp: _element('rp'),
  rt: _element('rt'),
  ruby: _element('ruby'),
  s: _element('s'),
  samp: _element('samp'),
  script: _element('script'),
  section: _element('section'),
  select: _element('select'),
  small: _element('small'),
  source: _element('source'),
  spacer: _element('spacer'),
  span: _element('span'),
  strike: _element('strike'),
  strong: _element('strong'),
  style: _element('style'),
  sub: _element('sub'),
  sup: _element('sup'),
  summary: _element('summary'),
  svg: _element('svg'),
  table: _element('table'),
  tbody: _element('tbody'),
  td: _element('td'),
  textarea: _element('textarea'),
  tfoot: _element('tfoot'),
  th: _element('th'),
  thead: _element('thead'),
  time: _element('time'),
  title: _element('title'),
  tr: _element('tr'),
  track: _element('track'),
  tt: _element('tt'),
  u: _element('u'),
  ul: _element('ul'),
  var: _element('var'),
  video: _element('video'),
  wbr: _element('wbr'),
  xmp: _element('xmp')
}
