import { Guild, Message } from 'discord.js'
import { createSubCommand } from '../../../client/handlers/command'
import {
  removeReactionRole,
  removeReactionRoleMessage,
} from '../../../database/reactionRoles'
import { PERMISSION_LEVELS } from '../../../util/constants'
import { findMessageFromGuild } from '../../../util/helpers'

export default createSubCommand(
  {
    parents: ['rr', 'reaction-role'],
    triggers: ['delete', 'remove'],
    category: 'moderation',
    cooldown: 10,
    desc: 'Provides a setup for a reaction role.',
    requiredPermissions: PERMISSION_LEVELS.user.concat([
      'MANAGE_ROLES',
      'MANAGE_CHANNELS',
      'MANAGE_MESSAGES',
    ]),
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    const reactionRoleMsg = await findMessageFromGuild(msg.guild, msg.id)

    if (!reactionRoleMsg) throw new Error('I could not find that message!')

    const removed = await removeReactionRoleMessage(msg.guild.id, reactionRoleMsg.id)

    if (!removed) throw new Error('That message is not a reaction role!')

    msg.channel.send('Removed the reaction role!')
  }
)
