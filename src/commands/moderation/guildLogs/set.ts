import { createSubCommand } from '../../../client/handlers/command'
import { setLogsWebhook } from '../../../database/config'
import { PERMISSION_LEVELS } from '../../../util/constants'
import { Success } from '../../../renderers/moderation/success'
import { mentionChannel } from '../../../renderers/format/mentions'

export default createSubCommand(
  {
    parents: ['logs', 'logger', 'log'],
    triggers: ['set'],
    cooldown: 20,
    desc: 'Sets the logs channel for all the logs',
    requiredPermissions: PERMISSION_LEVELS.user.concat([
      'MANAGE_WEBHOOKS',
      'MANAGE_CHANNELS',
      'MANAGE_MESSAGES',
      'MANAGE_GUILD',
    ]),
    category: 'moderation',
    guildOnly: true,
  },
  async (msg, args) => {
    if (!msg.guild) return

    const channel = msg.channel || msg.mentions.channels.first()
    const me = msg.guild.me

    if (!me) return
    if (channel.type !== 'text' && channel.type !== 'news')
      throw new Error('The channel must a text channel.')
    if (channel.guild.id !== msg.guild.id)
      throw new Error('That channel is not in this server.')

    const wh = await channel.createWebhook(`${me.user.username} Logging`, {
      avatar: me.user.displayAvatarURL(),
      reason: 'Logging channel',
    })

    await setLogsWebhook(msg.guild.id, wh.id)

    msg.reply(
      new Success(
        'Updated Logging Channel',
        `Set ${mentionChannel(channel.id)} as the logging channel for this server.`
      )
    )
  }
)
