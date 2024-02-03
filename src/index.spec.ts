import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { h, svg } from './index'

describe('h, svg', () => {
  describe('elements', () => {
    it('create html element', () => {
      const div = h('div', 'Hello world')

      expect(div.outerHTML).toBe('<div>Hello world</div>')
    })

    it('create svg element', () => {
      const circle = svg('circle')

      expect(circle).toBeInstanceOf(SVGElement)
      expect(circle.tagName).toBe('CIRCLE')
    })

    it('infers element type', () => {
      expectTypeOf<HTMLDivElement>(h('div', 'Hello world'))
    })

    it('accepts child array as props', () => {
      const parent = h('div', [
        h('div', 'foo'),
        h('div', 'bar'),
      ])

      expect('<div><div>foo</div><div>bar</div></div>').toBe(parent.outerHTML)
    })

    it('accepts child array as children', () => {
      const parent = h('div', null, [
        h('div', 'foo'),
        h('div', 'bar'),
      ])

      expect('<div><div>foo</div><div>bar</div></div>').toBe(parent.outerHTML)
    })

    it('accepts child string as props', () => {
      const parent = h('div', 'foo')

      expect('<div>foo</div>').toBe(parent.outerHTML)
    })

    it('accepts string as children', () => {
      const parent = h('div', null, 'foo')

      expect('<div>foo</div>').toBe(parent.outerHTML)
    })

    it('accepts number as children', () => {
      const parent = h('div', null, 42)

      expect('<div>42</div>').toBe(parent.outerHTML)
    })

    it('accepts string in array of children', () => {
      const parent = h('div', null, [h('div', 'foo'), 'bar'])

      expect('<div><div>foo</div>bar</div>').toBe(parent.outerHTML)
    })
  })

  describe('attributes', () => {
    it('binds arbitrary attributes', () => {
      const div = h('div', { fooBar: 'baz' })

      expect(div.outerHTML).toBe('<div foobar="baz"></div>')
    })

    it('doesnt bind null', () => {
      const div = h('div', { foo: null })

      expect(div.outerHTML).toBe('<div></div>')
    })

    it('doesnt bind undefined', () => {
      const div = h('div', { foo: undefined })

      expect(div.outerHTML).toBe('<div></div>')
    })

    it('binds boolean true', () => {
      const div = h('div', { foo: true })

      expect(div.outerHTML).toBe('<div foo="true"></div>')
    })

    it('binds boolean false', () => {
      const div = h('div', { foo: false })

      expect(div.outerHTML).toBe('<div foo="false"></div>')
    })

    it('binds zero', () => {
      const div = h('div', { foo: 0 })

      expect(div.outerHTML).toBe('<div foo="0"></div>')
    })
  })

  describe('class bindings', () => {
    it('binds from string', () => {
      const div = h('div', { class: 'foo bar' })

      expect(div.outerHTML).toBe('<div class="foo bar"></div>')
    })

    it('binds from object', () => {
      const div = h('div', { class: { one: true, two: false } })

      expect(div.outerHTML).toBe('<div class="one"></div>')
    })

    it('binds from array', () => {
      const div = h('div', { class: ['foo', { one: true, two: false }] })

      expect(div.outerHTML).toBe('<div class="foo one"></div>')
    })
  })

  describe('style bindings', () => {
    it('binds from string', () => {
      const div = h('div', { style: { backgroundColor: 'blue' } })

      expect(div.outerHTML).toBe('<div style="background-color: blue;"></div>')
    })
  })

  describe('listeners', () => {
    it('binds event listeners', () => {
      const onClick = vi.fn()

      const div = h('div', {
        onClick(e) {
          expectTypeOf<MouseEvent>(e)
          onClick(e)
        }
      })
      
      div.dispatchEvent(new Event('click'))

      expect(onClick).toHaveBeenCalled()
      expect(div.outerHTML).toBe('<div></div>')
    })
  })
})
