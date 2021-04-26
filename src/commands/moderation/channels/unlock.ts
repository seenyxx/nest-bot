import { TextChannel } from 'discord.js'

import { createSubCommand } from '../../../client/handlers/command'
import { Success } from '../../../renderers/moderation/success'
import { PERMISSION_LEVELS } from '../../../util/constants'

export default createSubCommand(
  {
    parents: ['channel'],
    triggers: ['unlock', 'unmute', 'allow-write', 'allow-send'],
    category: 'moderation',
    cooldown: 20,
    desc:
      'Makes the channel mentioned or the current channel available to everyone.',
    requiredPermissions: PERMISSION_LEVELS.user.concat('MANAGE_CHANNELS'),
    guildOnly: true,
  },
  async (msg, args) => {
    if (!msg.guild) return

    let channel = msg.mentions.channels.first() || (msg.channel as TextChannel)

    channel.createOverwrite(msg.guild.roles.everyone, {
      SEND_MESSAGES: true,
      ADD_REACTIONS: true,
    })

    msg.reply(
      new Success('Unlocked Channel', 'Everyone is now allowed to send messages.')
    )
  }
)
