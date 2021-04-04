export function codeBlock(txt: string, lang?: string) {
  return `\`\`\`${lang}\n${txt}\`\`\``
}

export function quoteBlock(txt: string) {
  return `> ${txt}`
}
