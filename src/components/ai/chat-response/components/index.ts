import type { ChatResponseComponents } from "../types"

export { default as ChatResponseHeading } from "./ChatResponseHeading.vue"
export { default as ChatResponseParagraph } from "./ChatResponseParagraph.vue"
export { default as ChatResponseBlockquote } from "./ChatResponseBlockquote.vue"
export { default as ChatResponseCode } from "./ChatResponseCode.vue"
export { default as ChatResponseList } from "./ChatResponseList.vue"
export { default as ChatResponseListItem } from "./ChatResponseListItem.vue"
export { default as ChatResponseTable } from "./ChatResponseTable.vue"
export { default as ChatResponseHr } from "./ChatResponseHr.vue"
export { default as ChatResponseHtml } from "./ChatResponseHtml.vue"
export { default as ChatResponseLink } from "./ChatResponseLink.vue"
export { default as ChatResponseImage } from "./ChatResponseImage.vue"
export { default as ChatResponseStrong } from "./ChatResponseStrong.vue"
export { default as ChatResponseEm } from "./ChatResponseEm.vue"
export { default as ChatResponseCodespan } from "./ChatResponseCodespan.vue"
export { default as ChatResponseDel } from "./ChatResponseDel.vue"
export { default as ChatResponseBr } from "./ChatResponseBr.vue"
export { default as ChatResponseText } from "./ChatResponseText.vue"

import ChatResponseHeading from "./ChatResponseHeading.vue"
import ChatResponseParagraph from "./ChatResponseParagraph.vue"
import ChatResponseBlockquote from "./ChatResponseBlockquote.vue"
import ChatResponseCode from "./ChatResponseCode.vue"
import ChatResponseList from "./ChatResponseList.vue"
import ChatResponseListItem from "./ChatResponseListItem.vue"
import ChatResponseTable from "./ChatResponseTable.vue"
import ChatResponseHr from "./ChatResponseHr.vue"
import ChatResponseHtml from "./ChatResponseHtml.vue"
import ChatResponseLink from "./ChatResponseLink.vue"
import ChatResponseImage from "./ChatResponseImage.vue"
import ChatResponseStrong from "./ChatResponseStrong.vue"
import ChatResponseEm from "./ChatResponseEm.vue"
import ChatResponseCodespan from "./ChatResponseCodespan.vue"
import ChatResponseDel from "./ChatResponseDel.vue"
import ChatResponseBr from "./ChatResponseBr.vue"
import ChatResponseText from "./ChatResponseText.vue"

export const chatResponseDefaults: ChatResponseComponents = {
  heading: ChatResponseHeading,
  paragraph: ChatResponseParagraph,
  blockquote: ChatResponseBlockquote,
  code: ChatResponseCode,
  list: ChatResponseList,
  list_item: ChatResponseListItem,
  table: ChatResponseTable,
  hr: ChatResponseHr,
  html: ChatResponseHtml,
  link: ChatResponseLink,
  image: ChatResponseImage,
  strong: ChatResponseStrong,
  em: ChatResponseEm,
  codespan: ChatResponseCodespan,
  del: ChatResponseDel,
  br: ChatResponseBr,
  text: ChatResponseText,
}
