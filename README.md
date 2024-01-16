# `@bedard/h`

[![Build status](https://img.shields.io/github/actions/workflow/status/scottbedard/h/test.yml?branch=main)](https://github.com/scottbedard/h/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scottbedard/h?token=Dj9EytYQgk&style=flat-square)](https://codecov.io/gh/scottbedard/h)
[![NPM](https://img.shields.io/npm/v/@bedard/h&style=flat-square)](https://www.npmjs.com/package/@bedard/h)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@bedard/h?label=gzipped&style=flat-square)](https://bundlephobia.com/result?p=@bedard/h)
[![License](https://img.shields.io/github/license/scottbedard/h?color=blue&style=flat-square)](https://github.com/scottbedard/h/blob/main/LICENSE)

Create DOM elements using a [Vue-like syntax](https://vuejs.org/api/render-function.html#h)

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [License](#license)

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

The first argument is the element tag name. The second argument is the props to be passed, and the third argument is the children. For convenience, the props argument can be omitted when an element has no attributes or event listeners. Below are some basic examples.

```ts
import { h } from '@bedard/h'

// all arguments except the tag name are optional
h('div')

// event listeners should be passed as onXxx
h('div', { onClick: () => {} })

// children can be a string
h('div', { ... }, 'hello')

// props can be omitted when there are only children
h('div', 'hello')

// children array can contain mixed elements and strings
h('div', ['hello', h('span', 'hello')])
```

## License

[MIT](https://github.com/scottbedard/h/tree/main?tab=MIT-1-ov-file#readme)

Copyright (c) 2024-present, Scott Bedard
