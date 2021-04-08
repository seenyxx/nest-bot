import { Message } from 'discord.js'
import { createSubCommand } from '../../../client/handlers/command'
import { getGuildLockdown, turnOnGuildLockdown } from '../../../database/config'
import { PERMISSION_LEVELS } from '../../../util/constants'
import { Success } from '../../../renderers/moderation/success'

export default createSubCommand(
  {
    parents: ['lockdown', 'ld'],
    triggers: ['on', 'true', 'yes'],
    category: 'moderation',
    cooldown: 10,
    desc:
      'Deletes all existing invites and turns on the server lockdown which **automatically bans** anyone who joins.',
    requiredPermissions: PERMISSION_LEVELS.admin,
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    const status = await getGuildLockdown(msg.guild.id)

    if (status) throw new Error('This server is already in a lockdown!')

    await turnOnGuildLockdown(msg.guild.id)
    ;(await msg.guild.fetchInvites()).array().forEach(inv => {
      if (inv.deletable) inv.delete('Lockdown!')
    })

    msg.reply(new Success('Lockdown', '🟢 ON'))
  }
)
