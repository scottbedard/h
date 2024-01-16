import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { h } from './index'

describe('h', () => {
  it('creates elements with text content', () => {
    const div = h('div', 'Hello world')

    expect(div.outerHTML).toBe('<div>Hello world</div>')
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

  it('accepts child string as children', () => {
    const parent = h('div', null, 'foo')

    expect('<div>foo</div>').toBe(parent.outerHTML)
  })

  it('binds class attribute', () => {
    const div = h('div', { class: 'foo bar' })

    expect(div.outerHTML).toBe('<div class="foo bar"></div>')
  })

  it('binds style attribute', () => {
    const div = h('div', { style: { backgroundColor: 'blue' } })

    expect(div.outerHTML).toBe('<div style="background-color: blue;"></div>')
  })

  it('binds arbitrary attributes', () => {
    const div = h('div', { fooBar: 'baz' })

    expect(div.outerHTML).toBe('<div foobar="baz"></div>')
  })

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
