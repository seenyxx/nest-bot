import { Message, PartialMessage } from 'discord.js'
export function codeBlock(txt: string, lang?: string) {
  return `\`\`\`${lang}\n${txt}\n\`\`\``
}

export function quoteBlock(txt: string) {
  return `> ${txt}`
}

export function messageLinkButtom(m: Message | PartialMessage) {
  return `[\`[Message Link]\`](${m.url})`
}
