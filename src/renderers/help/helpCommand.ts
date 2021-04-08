import { MessageEmbed } from 'discord.js'
import { THEME_COLORS, DEFAULT_SEPARATOR } from '../../util/constants'
import { botCache } from '../../util/cache'
import { joinArray, formatPermissions } from '../../util/helpers'
import { codeBlock } from '../format/other'
import { colorCyan } from '../format/colors'

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
        `${command.opts.triggers[0]} ${command.opts.usage || ''}`,
        'xml'
      )}`
    )

    if (command.opts.triggers.length > 1) {
      this.addField(
        'Aliases',
        joinArray(
          command.opts.triggers.slice(1, command.opts.triggers.length),
          '` `',
          '`'
        )
      )
    }

    this.addField(
      'Required Permissions',
      colorCyan(
        joinArray(
          formatPermissions(command.opts.requiredPermissions),
          ` ${DEFAULT_SEPARATOR} `
        )
      )
    )
  }
}
