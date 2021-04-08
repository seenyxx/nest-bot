import { MessageEmbed } from 'discord.js'
import { THEME_COLORS } from '../../util/constants'
import { codeBlock } from '../format/other'

export class MissingArgumentsError extends MessageEmbed {
  constructor(msg?: string, argsCount?: number) {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle('Missing Arguments')
    this.setDescription(msg || `You are missing ${argsCount || 'some'} arguments`)
  }
}
