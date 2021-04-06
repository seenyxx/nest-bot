export function colorGreen(txt: string) {
  return `\`\`\`diff\n+ ${txt.split('\n').join('\n+ ')} \n\`\`\``
}

export function colorRed(txt: string) {
  return `\`\`\`diff\n- ${txt.split('\n').join('\n- ')} \n\`\`\``
}

export function colorBlue(txt: string) {
  return `\`\`\`md\n# ${txt.split('\n').join('\n# ')}\n\`\`\``
}

export function colorCyan(txt: string) {
  return `\`\`\`yaml\n${txt} \n\`\`\``
}

export function colorYellow(txt: string) {
  return `\`\`\`fix\n${txt} \n\`\`\``
}
