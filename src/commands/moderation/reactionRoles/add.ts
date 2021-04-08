import { Message, TextChannel } from 'discord.js'
import { createSubCommand } from '../../../client/handlers/command'
import { addReactionRole, checkRRCount } from '../../../database/reactionRoles'
import { PERMISSION_LEVELS, EMOJI_REGEX } from '../../../util/constants'
import { findMessageFromGuild } from '../../../util/helpers'

export default createSubCommand(
  {
    parents: ['rr', 'reaction-role'],
    triggers: ['add'],
    category: 'moderation',
    cooldown: 10,
    desc:
      'Adds a reaction role with the format `<Reaction> : <Role>` separated by commas.',
    requiredPermissions: PERMISSION_LEVELS.user.concat([
      'MANAGE_ROLES',
      'MANAGE_CHANNELS',
      'MANAGE_MESSAGES',
    ]),
    guildOnly: true,
    usage: '<Message Id> <Reaction Roles>',
    argsCount: 2,
    missingArgs: 'You need to provide a message id and roles!',
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    if (await checkRRCount(msg.guild.id))
      throw new Error('You have reached the maximum amount of reaction roles.')
    const msgId = args.shift() as string
    const reactionRole = args.join(' ').split(',')

    const foundMessage = await findMessageFromGuild(msg.guild, msgId.trim())

    if (!foundMessage) throw new Error('Could not find that message!')

    const roles = msg.mentions.roles.map(r => r)

    if (await checkRRCount(msg.guild.id, reactionRole.length))
      throw new Error('You cannot add that many reaction roles.')

    for (let i = 0; i < reactionRole.length; i++) {
      const rrParsed = reactionRole[i].split(':')
      const reaction = rrParsed.shift()
      const role = roles[i]

      if (!role) {
        return msg.channel.send(`Invalid role for ${rrParsed[0]}.`)
      }
      if (!reaction || !reaction.trim().match(EMOJI_REGEX)) {
        return msg.channel.send(`Invalid reaction for \`${reaction}:${role.name}\`.`)
      }

      if (role.position > (msg.guild?.me?.roles.highest.position as number)) {
        return msg.channel.send(`The role \`${role.name}\` is higher than me.`)
      }

      foundMessage.react(reaction.trim())

      await addReactionRole(
        msg.guild?.id as string,
        foundMessage.id,
        reaction.trim(),
        role.id
      )
      msg.channel.send(`Added \`${reaction.trim()} : ${role.name}\``)
    }
  }
)
