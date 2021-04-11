import { TextChannel } from 'discord.js'

import { createSubCommand } from '../../../client/handlers/command'
import { Success } from '../../../renderers/moderation/success'
import { PERMISSION_LEVELS } from '../../../util/constants'

export default createSubCommand(
  {
    parents: ['channel'],
    triggers: ['lock', 'mute', 'view-only', 'read-only'],
    category: 'moderation',
    cooldown: 20,
    desc: 'Makes the channel mentioned or the current channel view only.',
    requiredPermissions: PERMISSION_LEVELS.user.concat('MANAGE_CHANNELS'),
    guildOnly: true,
  },
  async (msg, args) => {
    if (!msg.guild) return

    let channel = msg.mentions.channels.first() || msg.channel as TextChannel

    channel.createOverwrite(msg.guild.roles.everyone, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    })

    msg.reply(new Success('Locked Channel', 'Everyone is now prohibited from speaking in this channel.'))
  }
)
