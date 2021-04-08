import { GuildMember, Message } from 'discord.js'
import { createCommand } from '../../client/handlers/command'
import { BanDM } from '../../renderers/moderation/dmBan'
import { StandardError } from '../../renderers/errors/std'
import {
  PERMISSION_LEVELS,
  USERNAME_TAG_REGEX,
  ID_REGEX,
} from '../../util/constants'
import { mentionUser } from '../../renderers/format/mentions'
import { Success } from '../../renderers/moderation/success'

export default createCommand(
  {
    triggers: ['ban'],
    cooldown: 5,
    category: 'moderation',
    desc: 'Bans the mentioned user.',
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

        modBan(msg, member, reason)
      } else if (user.match(ID_REGEX)) {
        const member = msg.guild.members.cache.find(m => m.id === user)

        if (!member) throw new Error('I could not find that user.')

        modBan(msg, member, reason)
      } else {
        throw new Error('That is not a valid user.')
      }
    } else if (user.id) {
      modBan(msg, user, reason)
    }
  }
)

async function modBan(msg: Message, user: GuildMember, reason: string) {
  if (!user.bannable) throw new Error('I cannot ban that user!')

  const dm = await user.createDM()
  await dm
    .send(new BanDM(user.guild.name, reason))
    .catch(e =>
      msg.reply(new StandardError('No notification was sent to the user.'))
    )

  user.ban({
    reason: reason,
  })

  msg.reply(
    new Success(
      'Banned User',
      `Banned: ${mentionUser(user.id)}\nIssued by: ${mentionUser(msg.author.id)}`
    )
  )
}
