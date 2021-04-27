import { MessageEmbed } from 'discord.js'
import { getGuildLogsOptions, LogOptions, LogOptsKeys } from '../../database/config'
import { THEME_COLORS } from '../../util/constants'
import { padTextToLength } from '../format/other'

export class LogOptionsMessage extends MessageEmbed {
  constructor(logOpts: LogOptions) {
    super()

    let str = ''

    for (const key in logOpts) {
      str = str.concat(
        `${padTextToLength(key, 15)}: \`${
          logOpts[key as LogOptsKeys] === true ? '🟢' : '🔴'
        }\`\n`
      )
    }

    this.setColor(THEME_COLORS.info)
    this.setTitle('Log Options')
    this.setDescription(str)
  }
}
