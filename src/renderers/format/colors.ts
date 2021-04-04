export function colorGreen(txt: string) {
  return `\`\`\`diff\n+ ${txt}\`\`\``
}

export function colorRed(txt: string) {
  return `\`\`\`diff\n- ${txt}\`\`\``
}

export function colorBlue(txt: string) {
  return `\`\`\`yaml\n${txt}\`\`\``
}

export function colorCyan(txt: string) {
  return `\`\`\`js\n\`${txt}\`\`\`\``
}

export function colorYellow(txt: string) {
  return `\`\`\`fix\n${txt}\`\`\``
}
