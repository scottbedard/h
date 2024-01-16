/**
 * Event listeners
 */
type EventListeners = Partial<{
  [T in `on${Capitalize<keyof HTMLElementEventMap>}`]: T extends `on${infer U}`
    ? (e: Lowercase<U> extends keyof HTMLElementEventMap
      ? HTMLElementEventMap[Lowercase<U>]
      : never) => void
    : false
}>

/**
 * Props
 */
type Props = null | {
  [key: string]: any
  class?: string
  style?: Partial<CSSStyleDeclaration>
} & EventListeners

/**
 * Render dom elements
 */
export function h<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  propsOrChildren: Props | (HTMLElement | string)[] | string | null = null,
  children: (HTMLElement | string)[] | string = [],
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tagName)

  const props = typeof propsOrChildren === 'string' || propsOrChildren === null || Array.isArray(propsOrChildren)
    ? {}
    : propsOrChildren

  const normalChildren = typeof propsOrChildren === 'string'
    ? propsOrChildren
    : Array.isArray(propsOrChildren)
      ? propsOrChildren
      : children

  if (typeof normalChildren === 'string') {
    el.textContent = normalChildren
  } else {
    normalChildren.forEach(child => {
      el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
    })
  }

  if (props.class) {
    el.className = props.class
  } else if (props.style) {
    Object.entries(props.style).forEach(([key, value]) => {
      const prop = key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase()

      el.style.setProperty(prop, String(value))
    })
  } else {
    Object.entries(props).forEach(([key, value]) => {
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
