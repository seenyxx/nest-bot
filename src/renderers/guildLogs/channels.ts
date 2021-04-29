import {
  Collection,
  GuildChannel,
  MessageEmbed,
  PermissionOverwrites,
} from 'discord.js'

import { THEME_COLORS } from '../../util/constants'
import { codeBlock } from '../format/other'
import { compareObject } from '../../util/helpers'

export class LogChannelCreate extends MessageEmbed {
  constructor(c: GuildChannel) {
    super()
    this.setColor(THEME_COLORS.success)
    this.setTitle('Channel created')
    this.setDescription(`\`${c.name}\`\nType: ${c.type}`)
  }
}

export class LogChannelUpdate extends MessageEmbed {
  constructor(oldC: GuildChannel, newC: GuildChannel) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle('Updated Channel')
    this.setDescription(`
      ${oldC.name !== newC.name ? `Name: \`${oldC.name}\` ➡ \`${newC.name}\`\n` : ''}
      ${
        oldC.position !== newC.position
          ? `Position: ${oldC.position} ➡ ${newC.position}\n`
          : ''
      }
      ${
        oldC.parent !== newC.parent
          ? `Parent: \`${oldC.parent?.name || 'None'}\` ➡ \`${
              newC.parent?.name || 'None'
            }\`\n`
          : ''
      }
      ${
        oldC.permissionOverwrites !== newC.permissionOverwrites
          ? `Permission Overwrites: ${codeBlock(
              mapRecord(
                compareObject(
                  oldC.permissionOverwrites.toJSON(),
                  newC.permissionOverwrites.toJSON()
                ),
                '[',
                ']',
                '\n'
              ),
              'ini'
            )}`
          : ''
      }
    `)
  }
}

function mapRecord(
  record: Record<string, any>,
  begin?: string,
  end?: string,
  sep?: string
) {
  let str = ''

  for (const key in record) {
    str = str.concat(`${begin || ''}${key}${end || ''}${sep}`)
  }

  return str
}
