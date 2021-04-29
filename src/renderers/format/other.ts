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

export function padTextToLength(str: string, len: number, begin?: boolean) {
  let extraCharacters = Array(len - str.length)
    .fill(' ')
    .join('')

  if (begin) {
    return `${extraCharacters}${str}`
  }
  return str.concat(extraCharacters)
}

export function formatBooleanObject(obj: Record<string, boolean>) {
  let str = ''

  for (const key in obj) {
    const val = obj[key]

    str = str.concat(`${key}: ${val ? '`🟢`' : '`🔴`'}`)
  }

  return str
}
