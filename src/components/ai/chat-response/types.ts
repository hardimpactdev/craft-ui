import type { Component } from "vue"

export type ChatResponseComponents = Partial<{
  heading: Component
  paragraph: Component
  blockquote: Component
  code: Component
  list: Component
  list_item: Component
  table: Component
  hr: Component
  html: Component
  link: Component
  image: Component
  strong: Component
  em: Component
  codespan: Component
  del: Component
  br: Component
  text: Component
}>
