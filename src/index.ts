type Child = string | number | HTMLElement

type EventListeners = Partial<{
  [T in `on${Capitalize<keyof HTMLElementEventMap>}`]: T extends `on${infer U}`
    ? (e: Lowercase<U> extends keyof HTMLElementEventMap
      ? HTMLElementEventMap[Lowercase<U>]
      : never) => void
    : false
}>

type Props = null | {
  [key: string]: any
  class?: string
  style?: Partial<CSSStyleDeclaration>
} & EventListeners

/**
 * Render dom elements
 *
 * @param tagName - HTML tag name of the element
 * @param propsOrChildren - Element props or children
 * @param children - Element children
 */
export function h<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  propsOrChildren: Props | Child | Child[] | null = null,
  children?: Child[] | Child,
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tagName)

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
    el.className = _props.class
  } else if (_props.style) {
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

export const version = 'x.y.z'
