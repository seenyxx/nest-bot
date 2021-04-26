import { createSubCommand } from '../../../client/handlers/command'
import { getGuildLogsOptions } from '../../../database/config'
import { LogOptionsMessage } from '../../../renderers/guildLogs/options'
import { PERMISSION_LEVELS } from '../../../util/constants'

export default createSubCommand(
  {
    parents: ['logs', 'logger', 'log'],
    triggers: ['options', 'opts'],
    category: 'moderation',
    desc: 'Tells you the current events that the logs log.',
    cooldown: 5,
    requiredPermissions: PERMISSION_LEVELS.user.concat([
      'MANAGE_GUILD',
      'MANAGE_WEBHOOKS',
      'MANAGE_MESSAGES',
      'MANAGE_CHANNELS',
    ]),
    guildOnly: true,
    typing: false,
  },
  async (msg, args) => {
    if (!msg.guild) return

    const opts = await getGuildLogsOptions(msg.guild.id)
    msg.reply(new LogOptionsMessage(opts))
  }
)
