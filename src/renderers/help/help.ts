import { MessageEmbed } from 'discord.js'
import { botCache } from '../../util/cache'
import { THEME_COLORS } from '../../util/constants'

export class DefaultHelpMenu extends MessageEmbed {
  constructor() {
    super()
    const categories = [...new Set(botCache.commands.map(cmd => cmd.opts.category))]

    this.setColor(THEME_COLORS.info)
    this.setTitle('Help')
    this.setDescription(`Use \`${botCache.config.prefix}help <Category/Command>\``)

    categories.forEach(cat => {
      this.addField(
        botCache.helpDisplays[cat],
        `\`${botCache.config.prefix}help ${cat}\``,
        true
      )
    })
  }
}
