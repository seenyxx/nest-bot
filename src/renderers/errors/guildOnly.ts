import { MessageEmbed } from 'discord.js'
import { THEME_COLORS } from '../../util/constants'

export class GuildOnlyError extends MessageEmbed {
  constructor() {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle('Usage Error')
    this.setDescription('You may only use this in a server!')
  }
}
