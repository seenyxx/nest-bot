import { GuildMember, MessageReaction, PartialUser, User } from 'discord.js'
import { onEvent } from '../../client/handlers/event'
import { getReactionRole, removeReactionRole } from '../../database/reactionRoles'
import {
  getStarboardMessage,
  removeStarboardMessage,
} from '../../database/starboard'
import { StarboardMessage } from '../../renderers/starboard/message'
import { STAR_BOARD_MIN, STAR_BOARD_REACTION } from '../../util/constants'
import { getStarboardChannel } from '../../util/helpers'

export default onEvent('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) await reaction.fetch()
  if (reaction.message.partial) await reaction.message.fetch()
  if (user.partial) await user.fetch()

  if (user.bot) return
  if (!reaction.message.guild) return

  if (await parseReactionRole(reaction, user)) {
    await parseStarboard(reaction, user)
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
    member.roles.remove(role, 'Reaction role remove').catch(no => {})
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

  if (!count) return

  if (starboard) {
    const starboardMsg = await getStarboardMessage(guild.id, msg.id)

    if (!starboardMsg) return

    const fetchedMsg = await starboard.messages.fetch(starboardMsg).catch(no => {})

    if (fetchedMsg) {
      if (count < STAR_BOARD_MIN) {
        await removeStarboardMessage(guild.id, msg.id)
        fetchedMsg.delete()
      } else {
        fetchedMsg.edit(new StarboardMessage(msg, count))
      }
    } else {
      if (count < STAR_BOARD_MIN) {
        await removeStarboardMessage(guild.id, msg.id)
      } else {
        starboard.send(new StarboardMessage(msg, count))
      }
    }
  }
}
