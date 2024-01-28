# Changelog

# 0.3.1

- Fix attribute binding of falsey values

# 0.3.0

- Add `svg` utility

# 0.2.0

- Add support for nested class bindings

# 0.1.0

It can be tough to see, but sometimes we don't need a rendering framework.

Virtual doms are amazing, but in some situations they can be overkill. The goal here is to close that gap with a utility that resembles Vue's [`h`](https://vuejs.org/api/render-function.html#h) function, allowing for easy construction of dom trees and event listeners.

```ts
import { h } from '@bedard/h'

h('button', { id: 'foo', onClick: handler }, 'Hello world')

// <button id="foo">Hello world</button>
```
