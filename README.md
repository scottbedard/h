# `@bedard/h`

[![Build status](https://img.shields.io/github/actions/workflow/status/scottbedard/h/test.yml?branch=main&style=flat-square)](https://github.com/scottbedard/h/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/h?token=Dj9EytYQgk&style=flat-square)](https://codecov.io/gh/scottbedard/h)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fh?style=flat-square)](https://www.npmjs.com/package/@bedard/h)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@bedard/h?label=gzipped&style=flat-square)](https://bundlephobia.com/result?p=@bedard/h)
[![License](https://img.shields.io/github/license/scottbedard/h?color=blue&style=flat-square)](https://github.com/scottbedard/h/blob/main/LICENSE)

Element builder to mirror Vue's [`h`](https://vuejs.org/api/render-function.html#h) function. Typescript will infer the element properties and event listeners based on names.

```ts
import { h } from '@bedard/h'

h('button', { id: 'foo', onClick: handler }, 'Hello world')

// <button id="foo">Hello world</button>
```

## Installation

The recommended installation method is via NPM.

```bash
npm install @bedard/h
```

Alternatively, this library may be accessed via a CDN.

```html
<script src="https://unpkg.com/@bedard/h"></script>
```

## Basic usage

The first argument is the element tag name, next are props, and finally the children. For convenience, the props argument may be omitted when an element has no attributes or event listeners.

```ts
import { h } from '@bedard/h'

// create elements by tag name
h('div')

// plain text can be provided as child data
h('div', 'Hello world')

// child data may also be an array of text and elements
h('div', ['Hello', h('span', 'world')])

// attach props and listeners with `onEvent` names, typescript will infer the event type
h('button', { type: 'submit', onClick: handler }, 'Click here')
```

Use `svg` to create `http://www.w3.org/2000/svg` namespace elements

```ts
import { svg } from '@bedard/h'

svg('circle', { fill: 'red' })
```

## License

[MIT](https://github.com/scottbedard/h/tree/main?tab=MIT-1-ov-file#readme)

Copyright (c) 2024-present, Scott Bedard
