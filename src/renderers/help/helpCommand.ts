import { MessageEmbed } from 'discord.js'
import { THEME_COLORS, DEFAULT_SEPARATOR } from '../../util/constants'
import { botCache } from '../../util/cache'
import { joinArray, formatPermissions } from '../../util/helpers'
import { codeBlock } from '../format/other'

export class CommandHelpMenu extends MessageEmbed {
  constructor(cmd: string) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle(`Help for \`${cmd}\``)

    const command = botCache.commands.get(cmd)
    if (!command) {
      this.setColor(THEME_COLORS.error)
      this.setTitle(`Help for \`${cmd}\``)
      this.setDescription('That command does not exist!')
      return
    }

    this.addField('Description', command.opts.desc)
    this.addField(
      'Usage',
      `${codeBlock(
        `[${command.opts.triggers[0]}] ${command.opts.usage || ''}`,
        'ini'
      )}`
    )
    this.addField(
      'Aliases',
      command.opts.triggers.slice(1, command.opts.triggers.length)
        ? joinArray(
            command.opts.triggers.slice(1, command.opts.triggers.length),
            '` `',
            '`'
          )
        : 'None'
    )
    this.addField(
      'Required Permissions',
      codeBlock(
        joinArray(
          formatPermissions(command.opts.requiredPermissions),
          ` ${DEFAULT_SEPARATOR} `,
          '`'
        ),
        'js'
      )
    )
  }
}