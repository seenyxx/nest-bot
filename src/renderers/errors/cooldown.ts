import { MessageEmbed } from 'discord.js'
import { THEME_COLORS } from '../../util/constants'

export class CooldownError extends MessageEmbed {
  constructor(time: number) {
    super()
    this.setColor(THEME_COLORS.log)
    this.setTitle('⌚ Slow down!')
    this.setDescription(
      `You need to wait \`${time}\` seconds before you can use this command again!`
    )
    this.setFooter('🐌')
  }
}
