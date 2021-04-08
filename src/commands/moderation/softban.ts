import { Guild, GuildMember, Message } from 'discord.js'

import { createCommand } from '../../client/handlers/command'
import { StandardError } from '../../renderers/errors/std'
import { SoftBanDM } from '../../renderers/moderation/dmSoftban'
import {
  ID_REGEX,
  PERMISSION_LEVELS,
  USERNAME_TAG_REGEX,
} from '../../util/constants'
import { Success } from '../../renderers/moderation/success'
import { mentionUser } from '../../renderers/format/mentions'

export default createCommand(
  {
    triggers: ['softban', 'soft-ban'],
    cooldown: 5,
    category: 'moderation',
    desc:
      'Soft bans the mentioned user which bans them and then unbans them to clear their previous messages.',
    requiredPermissions: PERMISSION_LEVELS.user.concat('BAN_MEMBERS'),
    argsCount: 1,
    missingArgs: 'You need to mention a user.',
    guildOnly: true,
    usage: '<User> <Reason ?>',
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    const user = msg.mentions.members?.first() || args[0]
    const reason = args.slice(1, args.length).join(' ') || 'No reason provided.'

    if (typeof user === 'string') {
      if (user.match(USERNAME_TAG_REGEX)) {
        const member = msg.guild.members.cache.find(m => m.user.tag === user)

        if (!member) throw new Error('I could not find that user.')

        modBan(msg, msg.guild, member, reason)
      } else if (user.match(ID_REGEX)) {
        const member = msg.guild.members.cache.find(m => m.id === user)

        if (!member) throw new Error('I could not find that user.')

        modBan(msg, msg.guild, member, reason)
      } else {
        throw new Error('That is not a valid user.')
      }
    } else if (user.id) {
      modBan(msg, msg.guild, user, reason)
    }
  }
)

async function modBan(
  msg: Message,
  guild: Guild,
  user: GuildMember,
  reason: string
) {
  if (!user.bannable) throw new Error('I cannot ban that user!')

  const dm = await user.createDM()
  await dm
    .send(new SoftBanDM(user.guild.name, reason))
    .catch(e =>
      msg.reply(new StandardError('No notification was sent to the user.'))
    )

  user.ban({
    reason: `Softban: ${reason}`,
    days: 7,
  })

  const ban = await guild.fetchBan(user.user)

  if (ban) {
    guild.members.unban(ban.user, 'Soft ban')
  }

  msg.reply(
    new Success(
      'Softbanned User',
      `Softbanned: ${mentionUser(user.id)}\nIssued by: ${mentionUser(msg.author.id)}`
    )
  )
}
