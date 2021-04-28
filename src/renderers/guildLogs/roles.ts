import { GuildMember, MessageEmbed, Role } from 'discord.js'
import { mentionRole } from '../format/mentions'
import { THEME_COLORS } from '../../util/constants'
import { formatBooleanObject } from '../format/other'
import { compareBooleanObjects } from '../../util/helpers'

export class RoleCreateLog extends MessageEmbed {
  constructor(role: Role) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle('Role created')
    this.setDescription(`\`${role.name} ${mentionRole(role.id)}\``)
  }
}

export class RoleUpdateLog extends MessageEmbed {
  constructor(author: GuildMember, oldRole: Role, newRole: Role) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setAuthor(author.user.tag, author.user.displayAvatarURL())
    this.setTitle('Role updated')
    this.setDescription(formatBooleanObject(compareBooleanObjects(oldRole.permissions.serialize(), newRole.permissions.serialize())))
  }
}