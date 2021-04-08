import {
  GuildMember,
  MessageReaction,
  PartialUser,
  User,
  TextChannel,
  NewsChannel,
} from 'discord.js'

import { onEvent } from '../client/handlers/event'
import { getReactionRole, removeReactionRole } from '../database/reactionRoles'
import { STAR_BOARD_REACTION, STAR_BOARD_MIN } from '../util/constants'
import { getStarboardChannel } from '../util/helpers'
import { StarboardMessage } from '../renderers/starboard/message'
import { getStarboardMessage, setStarboardMessage } from '../database/starboard'

export default onEvent('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) await reaction.fetch()
  if (reaction.message.partial) await reaction.message.fetch()
  if (user.partial) await user.fetch()

  if (user.bot) return
  if (!reaction.message.guild) return

  if (await parseReactionRole(reaction, user)) {
    parseStarboard(reaction, user)
  }
})

async function parseReactionRole(
  reaction: MessageReaction,
  user: User | PartialUser
) {
  if (!reaction.message.guild) return

  const msg = reaction.message
  const guild = reaction.message.guild
  const reactionRole = await getReactionRole(guild.id, msg.id, reaction.emoji.name)

  if (!reactionRole) return true

  const role = guild.roles.cache.find(r => r.id === reactionRole.role)

  if (!role) {
    await reaction.remove()
    await removeReactionRole(guild.id, msg.id, reactionRole.emoji, reactionRole.role)
    return
  }

  const member = guild.member(user as User)

  if (member) {
    if (role.position > (guild.me as GuildMember).roles.highest.position) return
    member.roles.add(role, 'Reaction role add').catch(no => {})
  }
}

async function parseStarboard(reaction: MessageReaction, user: User | PartialUser) {
  if (
    reaction.emoji.name !== STAR_BOARD_REACTION ||
    !reaction.message.guild ||
    reaction.message.author.bot
  )
    return

  const guild = reaction.message.guild
  const starboard = await getStarboardChannel(reaction.message.guild)
  const msg = reaction.message
  const count = reaction.count

  if (!count || count < STAR_BOARD_MIN) return

  if (starboard) {
    const starboardMsg = await getStarboardMessage(guild.id, msg.id)

    if (!starboardMsg) {
      await sendStarboardMessage(starboard, count)
      return
    }

    const fetchedMsg = await starboard.messages.fetch(starboardMsg).catch(no => {})

    if (fetchedMsg) {
      fetchedMsg.edit(new StarboardMessage(msg, count))
    } else {
      await sendStarboardMessage(starboard, count)
    }
  }

  async function sendStarboardMessage(
    starboard: TextChannel | NewsChannel,
    count: number
  ) {
    const m = await starboard.send(new StarboardMessage(msg, count))
    setStarboardMessage(guild.id, msg.id, m.id)
  }
}
