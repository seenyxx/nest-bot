import { MessageEmbed } from 'discord.js'
import { THEME_COLORS } from '../../util/constants'

export class Success extends MessageEmbed {
  constructor(title: string, desc: string) {
    super()
    this.setColor(THEME_COLORS.success)
    this.setTitle(title)
    this.setDescription(desc)
  }
}
