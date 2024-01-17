# `@bedard/h`

[![Build status](https://img.shields.io/github/actions/workflow/status/scottbedard/h/test.yml?branch=main)](https://github.com/scottbedard/h/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/h?token=Dj9EytYQgk&style=flat-square)](https://codecov.io/gh/scottbedard/h)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fh?style=flat-square)](https://www.npmjs.com/package/@bedard/h)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@bedard/h?label=gzipped&style=flat-square)](https://bundlephobia.com/result?p=@bedard/h)
[![License](https://img.shields.io/github/license/scottbedard/h?color=blue&style=flat-square)](https://github.com/scottbedard/h/blob/main/LICENSE)

It may be tough to admit, but sometimes we don't need rendering frameworks.

Virtual doms are amazing, but in simple situations they can be overkill. The goal here is to close that gap with a utility that resembles Vue's [`h`](https://vuejs.org/api/render-function.html#h) function, allowing for easy construction of dom trees and event listeners.

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

Alternatively, this library maybe be accessed via a CDN.

```html
<script src="https://unpkg.com/@bedard/h"></script>
```

## Basic usage

The first argument is the element tag name, next are props, and finally the children. For convenience, the props argument may be omitted when an element has no attributes or event listeners.

```ts
import { h } from '@bedard/h'

// all arguments except the tag name are optional
h('div')

// children may be a string, number, or element
h('div', null, 'hello')

// props may be omitted when there are only children
h('div', 'hello')

// children may also be a mixed array of child items
h('div', ['hello', h('span', 'world')])

// listeners use an `onEvent` naming convention, typescript will infer the event type
h('button', { onClick: handler })
```

## License

[MIT](https://github.com/scottbedard/h/tree/main?tab=MIT-1-ov-file#readme)

Copyright (c) 2024-present, Scott Bedard
