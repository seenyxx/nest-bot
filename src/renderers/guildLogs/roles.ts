import { GuildMember, MessageEmbed, Role } from 'discord.js'
import { mentionRole } from '../format/mentions'
import { THEME_COLORS } from '../../util/constants'
import { formatBooleanObject } from '../format/other'
import { compareBooleanObjects } from '../../util/helpers'

export class LogRoleCreate extends MessageEmbed {
  constructor(role: Role) {
    super()
    this.setColor(THEME_COLORS.success)
    this.setTitle('Role created')
    this.setDescription(`\`${role.name} ${mentionRole(role.id)}\` | ${role.id}`)
  }
}

export class LogRoleUpdate extends MessageEmbed {
  constructor(oldRole: Role, newRole: Role) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setAuthor(`\`${newRole.name}\` | ${newRole.id}`)
    this.setTitle('Role updated')
    this.setDescription(
      `
      ${
        oldRole.name !== newRole.name
          ? `Name: \`${oldRole.name}\` ➡ \`${newRole.name}\`\n`
          : ''
      }
      ${
        oldRole.position !== newRole.position
          ? `Position: ${oldRole.position} ➡ ${newRole.position}\n`
          : ''
      }
      ${
        oldRole.hoist !== newRole.hoist
          ? `Host: ${oldRole.hoist} ➡ ${newRole.hoist}\n`
          : ''
      }
      ${
        oldRole.mentionable !== newRole.mentionable
          ? `Mentionable: ${oldRole.mentionable} ➡ ${newRole.mentionable}\n`
          : ''
      }
      ${
        oldRole.hexColor !== newRole.hexColor
          ? `Color \`${oldRole.hexColor}\` ➡ \`${newRole.hexColor}\`\n`
          : ''
      }

      Permission Changes:
      ${
        oldRole.permissions !== newRole.permissions
          ? formatBooleanObject(
              compareBooleanObjects(
                oldRole.permissions.serialize(),
                newRole.permissions.serialize()
              )
            )
          : ''
      }`
    )
  }
}

export class LogRoleDelete extends MessageEmbed {
  constructor(role: Role) {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle('Role deleted')
    this.setDescription(`${role.name} | ${role.id}`)
  }
}
