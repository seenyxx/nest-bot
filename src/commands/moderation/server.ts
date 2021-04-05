import { createCommand } from '../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../util/constants'
import { Message } from 'discord.js'
import { ServerInformation } from '../../renderers/moderation/serverInfo'

export default createCommand(
  {
    triggers: ['server'],
    category: 'moderation',
    cooldown: 8,
    desc: "Tells you the server's information",
    requiredPermissions: PERMISSION_LEVELS.user,
    guildOnly: true
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    msg.reply(new ServerInformation(msg.guild))
  }
)
