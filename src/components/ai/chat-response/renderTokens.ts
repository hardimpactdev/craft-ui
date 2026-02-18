import { h, type VNode } from "vue"
import type { Token, Tokens } from "marked"
import type { ChatResponseComponents } from "./types"

export function renderTokens(
  tokens: Token[],
  components: ChatResponseComponents,
): VNode[] {
  const vnodes: VNode[] = []

  for (const token of tokens) {
    const vnode = renderToken(token, components)
    if (vnode !== null) {
      if (Array.isArray(vnode)) {
        vnodes.push(...vnode)
      } else {
        vnodes.push(vnode)
      }
    }
  }

  return vnodes
}

function renderChildren(
  tokens: Token[] | undefined,
  components: ChatResponseComponents,
): VNode[] {
  if (!tokens || tokens.length === 0) return []
  return renderTokens(tokens, components)
}

function renderToken(
  token: Token,
  components: ChatResponseComponents,
): VNode | VNode[] | null {
  switch (token.type) {
    case "space":
      return null

    case "hr":
      return components.hr
        ? h(components.hr)
        : h("hr")

    case "br":
      return components.br
        ? h(components.br)
        : h("br")

    case "heading": {
      const t = token as Tokens.Heading
      const children = () => renderChildren(t.tokens, components)
      if (components.heading) {
        return h(components.heading, { depth: t.depth }, { default: children })
      }
      return h(`h${t.depth}`, null, children())
    }

    case "paragraph": {
      const t = token as Tokens.Paragraph
      const children = () => renderChildren(t.tokens, components)
      if (components.paragraph) {
        return h(components.paragraph, null, { default: children })
      }
      return h("p", null, children())
    }

    case "blockquote": {
      const t = token as Tokens.Blockquote
      const children = () => renderChildren(t.tokens, components)
      if (components.blockquote) {
        return h(components.blockquote, null, { default: children })
      }
      return h("blockquote", null, children())
    }

    case "code": {
      const t = token as Tokens.Code
      if (components.code) {
        return h(components.code, { lang: t.lang, text: t.text })
      }
      const codeEl = h("code", { class: t.lang ? `language-${t.lang}` : undefined }, t.text)
      return h("pre", null, [codeEl])
    }

    case "list": {
      const t = token as Tokens.List
      const children = () => t.items.map((item) => renderToken(item, components) as VNode)
      if (components.list) {
        return h(
          components.list,
          { ordered: t.ordered, start: t.start, loose: t.loose },
          { default: children },
        )
      }
      const tag = t.ordered ? "ol" : "ul"
      const attrs: Record<string, unknown> = {}
      if (t.ordered && t.start !== 1 && t.start !== "") {
        attrs.start = t.start
      }
      return h(tag, attrs, children())
    }

    case "list_item": {
      const t = token as Tokens.ListItem
      const children = () => renderChildren(t.tokens, components)
      if (components.list_item) {
        return h(
          components.list_item,
          { task: t.task, checked: t.checked, loose: t.loose },
          { default: children },
        )
      }
      if (t.task) {
        const checkbox = h("input", {
          type: "checkbox",
          checked: t.checked ?? false,
          disabled: true,
        })
        return h("li", null, [checkbox, ...children()])
      }
      return h("li", null, children())
    }

    case "table": {
      const t = token as Tokens.Table
      if (components.table) {
        return h(
          components.table,
          { align: t.align, header: t.header, rows: t.rows },
        )
      }
      const headerCells = t.header.map((cell) =>
        h("th", { style: cell.align ? { textAlign: cell.align } : undefined },
          renderChildren(cell.tokens, components)),
      )
      const headerRow = h("tr", null, headerCells)
      const thead = h("thead", null, [headerRow])

      const bodyRows = t.rows.map((row) => {
        const cells = row.map((cell) =>
          h("td", { style: cell.align ? { textAlign: cell.align } : undefined },
            renderChildren(cell.tokens, components)),
        )
        return h("tr", null, cells)
      })
      const tbody = h("tbody", null, bodyRows)

      return h("table", null, [thead, tbody])
    }

    case "html": {
      const t = token as Tokens.HTML
      if (components.html) {
        return h(components.html, { text: t.text })
      }
      return h("span", { innerHTML: t.text })
    }

    case "text": {
      const t = token as Tokens.Text
      if (components.text) {
        return h(components.text, { text: t.text }, {
          default: t.tokens ? () => renderChildren(t.tokens, components) : undefined,
        })
      }
      if (t.tokens) {
        return renderChildren(t.tokens, components)
      }
      return h("span", null, t.text)
    }

    case "strong": {
      const t = token as Tokens.Strong
      const children = () => renderChildren(t.tokens, components)
      if (components.strong) {
        return h(components.strong, null, { default: children })
      }
      return h("strong", null, children())
    }

    case "em": {
      const t = token as Tokens.Em
      const children = () => renderChildren(t.tokens, components)
      if (components.em) {
        return h(components.em, null, { default: children })
      }
      return h("em", null, children())
    }

    case "codespan": {
      const t = token as Tokens.Codespan
      if (components.codespan) {
        return h(components.codespan, { text: t.text })
      }
      return h("code", null, t.text)
    }

    case "link": {
      const t = token as Tokens.Link
      const children = () => renderChildren(t.tokens, components)
      if (components.link) {
        return h(
          components.link,
          { href: t.href, title: t.title ?? undefined },
          { default: children },
        )
      }
      return h("a", { href: t.href, title: t.title ?? undefined }, children())
    }

    case "image": {
      const t = token as Tokens.Image
      if (components.image) {
        return h(components.image, {
          href: t.href,
          title: t.title ?? undefined,
          text: t.text,
        })
      }
      return h("img", { src: t.href, alt: t.text, title: t.title ?? undefined })
    }

    case "del": {
      const t = token as Tokens.Del
      const children = () => renderChildren(t.tokens, components)
      if (components.del) {
        return h(components.del, null, { default: children })
      }
      return h("del", null, children())
    }

    case "escape": {
      const t = token as Tokens.Escape
      return h("span", null, t.text)
    }

    default:
      return null
  }
}
