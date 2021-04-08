import { Message } from 'discord.js'

import { createSubCommand } from '../../../client/handlers/command'
import { getGuildLockdown, turnOffGuildLockdown } from '../../../database/config'
import { Success } from '../../../renderers/moderation/success'
import { PERMISSION_LEVELS } from '../../../util/constants'

export default createSubCommand(
  {
    parents: ['lockdown', 'ld'],
    triggers: ['off', 'false', 'resolve', 'no'],
    category: 'moderation',
    cooldown: 10,
    desc: 'Turns off the server lockdown if it is on.',
    requiredPermissions: PERMISSION_LEVELS.admin,
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    const status = await getGuildLockdown(msg.guild.id)

    if (!status) throw new Error('This server is not in a lockdown!')

    await turnOffGuildLockdown(msg.guild.id)

    msg.reply(new Success('Lockdown', '🔴 OFF'))
  }
)
