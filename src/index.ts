type Child = string | number | HTMLElement

type ClassBinding = Record<string, any> | string

type MaybeArray<T> = T | T[]

type EventListeners = Partial<{
  [T in `on${Capitalize<keyof HTMLElementEventMap>}`]: T extends `on${infer U}`
    ? (e: Lowercase<U> extends keyof HTMLElementEventMap
      ? HTMLElementEventMap[Lowercase<U>]
      : never) => void
    : false
}>

type Props = null | {
  [key: string]: any
  class?: MaybeArray<ClassBinding>
  style?: Partial<CSSStyleDeclaration>
} & EventListeners

// create element functions
export function h<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  propsOrChildren: Props | Child | Child[] | null = null,
  children?: MaybeArray<Child>,
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tagName)

  return bind(el, propsOrChildren, children)
}

export function svg<T extends keyof SVGElementTagNameMap>(
  tagName: T,
  propsOrChildren: Props | Child | Child[] | null = null,
  children?: MaybeArray<Child>,
): SVGElementTagNameMap[T] {
  const el = document.createElementNS<T>('http://www.w3.org/2000/svg', tagName)

  return bind(el, propsOrChildren, children)
}

// bind props and children to element
function bind<T extends Element>(
  el: T,
  propsOrChildren: Props | Child | Child[] | null = null,
  children?: MaybeArray<Child>,
): T {
  const _props = (
    !propsOrChildren
    || propsOrChildren instanceof Element
    || typeof propsOrChildren === 'string'
    || typeof propsOrChildren === 'number'
    || Array.isArray(propsOrChildren)
  ) ? {} : propsOrChildren

  const _children = (propsOrChildren instanceof Element || typeof propsOrChildren === 'string' || typeof propsOrChildren === 'number')
    ? [propsOrChildren]
    : Array.isArray(propsOrChildren)
      ? propsOrChildren
      : (children instanceof Element || typeof children === 'string' || typeof children === 'number')
        ? [children]
        : Array.isArray(children)
          ? children
          : []

  _children.forEach(child => {
    el.appendChild(child instanceof Element ? child : document.createTextNode(String(child)))
  })

  if (_props.class) {
    bindClasses(el, _props.class)
  } else if (_props.style && el instanceof HTMLElement) {
    Object.entries(_props.style).forEach(([key, value]) => {
      const prop = key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase()

      el.style.setProperty(prop, String(value))
    })
  } else {
    Object.entries(_props).forEach(([key, value]) => {
      const eventParts = key.match(/^on([A-Z][A-Za-z]+)$/)

      if (Array.isArray(eventParts)) {
        el.addEventListener(eventParts[1].toLowerCase(), value)
      } else {
        el.setAttribute(key.toLowerCase(), String(value))
      }
    })
  }

  return el
}

// bind element classes
function bindClasses(el: Element, binding: ClassBinding) {
  if (typeof binding === 'string') {
    el.classList.add(binding)
  } else if (Array.isArray(binding)) {
    binding.forEach(value => bindClasses(el, value))
  } else {
    Object.entries(binding).forEach(([key, value]) => {
      if (value) {
        el.classList.add(key)
      }
    })
  }
}

// version watermark
export const version = 'x.y.z'
