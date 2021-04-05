import { MessageEmbed } from 'discord.js'
import { HelpCategories } from '../../client/handlers/command'
import { THEME_COLORS } from '../../util/constants'
import { botCache } from '../../util/cache'
import { codeBlock } from '../format/other'

export class CategoryHelpMenu extends MessageEmbed {
  constructor(helpCat: HelpCategories) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle(`Help for \`${helpCat}\``)
    this.addField('Commands', formatCategory(helpCat))
  }
}

function formatCategory(helpCat: HelpCategories) {
  const commands = [
    ...new Set(
      botCache.commands
        .filter(cmd => cmd.opts.category === helpCat)
        .map(cmd => cmd.opts)
    ),
  ]

  let text = ''

  commands.forEach(catCommands => {
    text = text.concat(`[${catCommands.triggers[0]}] ${catCommands.usage || ''}\n`)
  })

  return codeBlock(text, 'ini')
}
