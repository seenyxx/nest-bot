import { MessageEmbed } from 'discord.js'
import { getGuildLogsOptions, LogOptions, LogOptsKeys } from '../../database/config'
import { THEME_COLORS } from '../../util/constants'

export class LogOptionsMessage extends MessageEmbed {
  constructor(logOpts: LogOptions) {
    super()

    let str = ''

    for (const key in logOpts) {
      str = str.concat(
        `[${key}](https://discord.com) : \`${
          logOpts[key as LogOptsKeys] === true ? '🟢' : '🔴'
        }\``
      )
    }

    this.setColor(THEME_COLORS.info)
    this.setTitle('Log Options')
    this.setDescription(str)
  }
}
