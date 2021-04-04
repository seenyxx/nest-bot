import { MessageEmbed, PermissionResolvable } from 'discord.js'
import { THEME_COLORS } from '../../util/constants'
import { joinArray } from '../../util/helpers'

export class PermissionError extends MessageEmbed {
  constructor(permissions: PermissionResolvable[]) {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle('Permission Error')
    this.addField(
      'Info',
      `You seem to be missing one or more of these permissions:\n${joinArray(
        permissions,
        '` `',
        '`'
      )}`
    )
  }
}

export class ClientPermissionError extends PermissionError {
  constructor(permissions: PermissionResolvable[]) {
    super(permissions)
    this.fields = []
    this.addField(
      'Info',
      `I seem to be missing one or more of the following permissions:\n${joinArray(
        permissions,
        '` `',
        '`'
      )}`
    )
  }
}
