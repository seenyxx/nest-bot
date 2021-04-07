import { Message } from 'discord.js'

import { createSubCommand } from '../../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../../util/constants'

export default createSubCommand({
  parents: ['rr','reaction-role'],
  triggers: ['create', 'make', '_default'],
  category: 'moderation',
  cooldown: 10,
  desc: 'Provides a setup for a reaction role.',
  requiredPermissions: PERMISSION_LEVELS.user.concat(['MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES']),
  guildOnly: true,
}, async (msg: Message, args: string[]) => {
  msg.reply('dle')
})