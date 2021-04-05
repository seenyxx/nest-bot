import { MessageEmbed } from 'discord.js'
import { THEME_COLORS } from '../../util/constants'
import { colorRed } from '../format/colors'

export class BanDM extends MessageEmbed {
  constructor(server: string, reason: string) {
    super()
    this.setColor(THEME_COLORS.log)
    this.setTitle(`You have been banned from the server \`${server}\``)
    this.setDescription(colorRed(reason))
  }
}
