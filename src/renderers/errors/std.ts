import { MessageEmbed } from 'discord.js'

import { THEME_COLORS } from '../../util/constants'
import { colorRed } from '../format/colors'

export class StandardError extends MessageEmbed {
  constructor(e: any) {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle('Error')
    this.setDescription(colorRed(`${e}`))
  }
}
