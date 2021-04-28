import { GuildMember, MessageEmbed, Role } from 'discord.js'
import { mentionRole } from '../format/mentions'
import { THEME_COLORS } from '../../util/constants'
import { formatBooleanObject } from '../format/other'
import { compareBooleanObjects } from '../../util/helpers'

export class LogRoleCreate extends MessageEmbed {
  constructor(role: Role) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle('Role created')
    this.setDescription(`\`${role.name} ${mentionRole(role.id)}\``)
  }
}

export class LogRoleUpdate extends MessageEmbed {
  constructor(oldRole: Role, newRole: Role) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle('Role updated')
    this.setDescription(formatBooleanObject(compareBooleanObjects(oldRole.permissions.serialize(), newRole.permissions.serialize())))
  }
}

export class LogRoleDelete extends MessageEmbed {
  constructor(role: Role) {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle('Role deleted')
    this.setDescription(role.name)
  }
}